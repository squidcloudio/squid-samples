import { executable, scheduler, secureDatabase, SquidService } from '@squidcloud/backend';
import { CronExpression } from '@squidcloud/client';
import { fluctuatePrice, getRandomNumber, isSameDate } from '../utils/ticker.utils';
import dayjs from 'dayjs';
import _ from 'lodash';
import { ALL_TICKERS, BuiltInTicker, PortfolioItem, SimulationDay, Ticker, UserProfile } from 'common/common-types';

// noinspection JSUnusedGlobalSymbols
/**
 * `OnboardingArcherService` provides functionalities related to actions in the Archer sample app.
 * It offers methods for generating portfolios, running simulations, and initializing user profiles,
 * among other features. This service extends the `SquidService` and makes use of the
 * Squid platform capabilities.
 *
 * For more detailed documentation, see {@link https://docs.squid.cloud/docs/development-tools/backend/}.
 */
export class OnboardingArcherService extends SquidService {
  /**
   * Collection references in the Squid SDK. We use them to interact with those collections (for example, for queries)
   * For more information, see {@link https://docs.squid.cloud/docs/development-tools/client-sdk/collection-reference}.
   */
  private readonly tickerCollection = this.squid.collection<Ticker>('ticker');
  private readonly simulationDayCollection = this.squid.collection<SimulationDay>('simulationDay');
  private readonly portfolioCollection = this.squid.collection<PortfolioItem>('portfolio');
  private readonly userProfileCollection = this.squid.collection<UserProfile>('userProfile');

  /**
   * Grants full access to the built-in database.
   * For more information, see {@link https://docs.squid.cloud/docs/development-tools/backend//security-rules/secure-data-access}.
   *
   * @returns {boolean} Always returns true to allow access.
   */
  @secureDatabase('all', 'built_in_db')
  allowAllAccessToBuiltInDb(): boolean {
    return true;
  }

  /**
   * Asynchronously generates a user's portfolio by randomly selecting tickers and assigning values.
   * To learn more about executables, see {@link https://docs.squid.cloud/docs/development-tools/backend/executables}.
   * To learn more about mutations, see {@link https://docs.squid.cloud/docs/development-tools/client-sdk/mutations}.
   */
  @executable()
  async generatePortfolio(): Promise<void> {
    console.log('Generating portfolio');
    let allTickers = await this.getAllTickers();
    if (!allTickers.length) {
      await this.generateTickerPricesJob();
      allTickers = await this.getAllTickers();
    }
    const shuffledTickers = _.shuffle(allTickers);
    const balance = 100_000;
    const maximumValuePerTicker = Math.floor(balance / 5);
    let totalBalanceUsed = 0;
    await this.squid.runInTransaction(async (txId) => {
      const firstFiveTickers = shuffledTickers.slice(0, 5);
      for (let i = 0; i < firstFiveTickers.length; i++) {
        const ticker = firstFiveTickers[i];
        const amountToBuy = Math.floor(maximumValuePerTicker / ticker.closePrice);
        totalBalanceUsed += amountToBuy * ticker.closePrice;
        await this.portfolioCollection.doc(String(i)).insert(
          {
            tickerId: ticker.id,
            amount: amountToBuy,
            indexInUi: i,
          },
          txId,
        );
      }

      await this.userProfileCollection
        .doc('defaultUser')
        .insert({ id: 'defaultUser', balance: balance - totalBalanceUsed }, txId);
    });
  }

  /**
   * Asynchronously runs a simulation for the user's portfolio for the past month.
   * To learn more about executables, see {@link https://docs.squid.cloud/docs/development-tools/backend/executables}.
   * To learn more about mutations, see {@link https://docs.squid.cloud/docs/development-tools/client-sdk/mutations}.
   */
  @executable()
  async runSimulation(): Promise<void> {
    console.log('Running simulation...');
    const portfolio = await this.portfolioCollection.query().dereference().snapshot();

    const allTickersMap = await this.getAllTickersMap();

    // Start transaction
    await this.squid.runInTransaction(async (txId) => {
      const today = dayjs().startOf('day');
      // Insert data for 28 days back (should be divisible by 4)
      let previousFluctuation = 0;
      for (let i = 0; i < 28; i++) {
        const date = today.subtract(i, 'day').toDate();
        const simulationDay: SimulationDay = {
          date,
          value: 0,
        };

        if (previousFluctuation) {
          simulationDay.value += fluctuatePrice(previousFluctuation, 2);
        } else {
          for (const portfolioItem of portfolio) {
            const ticker = allTickersMap[portfolioItem.tickerId];
            const valueThisDay = ticker.closePrice * portfolioItem.amount;
            simulationDay.value += valueThisDay;
          }
        }
        previousFluctuation = simulationDay.value;

        console.log(`Inserting simulation day ${date.toISOString()}: `, simulationDay);

        await this.simulationDayCollection.doc(i + '').insert(simulationDay, txId);
      }
    });
  }

  /**
   * Initializes a user's profile with a default balance of $100,000.
   * To learn more about executables, see {@link https://docs.squid.cloud/docs/development-tools/backend/executables}.
   * To learn more about mutations, see {@link https://docs.squid.cloud/docs/development-tools/client-sdk/mutations}.
   */
  @executable()
  async initializeUserProfile(): Promise<void> {
    console.log('Running initializeUserProfileJob...');
    const userId = 'defaultUser';
    const doc = this.userProfileCollection.doc(userId);
    const userProfile = await doc.snapshot();
    if (userProfile) return;

    // Initializing the user's profile with $100,000 balance
    await doc.insert({ id: userId, balance: 100_000 });
  }

  /**
   * Job that asynchronously generates ticker prices. Scheduled to run every 10 seconds.
   * To learn more about schedulers, see {@link https://docs.squid.cloud/docs/development-tools/backend/schedulers}.
   * To learn more about mutations, see {@link https://docs.squid.cloud/docs/development-tools/client-sdk/mutations}.
   * To learn more about queries, see {@link https://docs.squid.cloud/docs/development-tools/client-sdk/queries}.
   */
  @scheduler('generateTickerPricesJob', CronExpression.EVERY_10_SECONDS, true)
  async generateTickerPricesJob(): Promise<void> {
    console.log(`${new Date().toLocaleTimeString()} Updating tickers...`);
    const allTickersInDb = await this.tickerCollection.query().dereference().snapshot();
    const allTickers = allTickersInDb.length ? allTickersInDb : ALL_TICKERS;
    await this.squid.runInTransaction(async (txId) => {
      for (const ticker of allTickers) {
        await this.generateTickerPrice(ticker, txId);
      }
    });
  }

  private async generateTickerPrice(ticker: BuiltInTicker, txId: string): Promise<void> {
    const closePrice = ticker.closePrice || getRandomNumber(10, 130);

    let fluctuatedPrice = -1;
    // Make sure the price is not negative
    while (fluctuatedPrice < 0) {
      fluctuatedPrice = fluctuatePrice(closePrice);
    }

    // Calculate previous close's price
    const prevDayClosePrice = parseFloat(
      (!ticker.closePrice || !isSameDate(ticker.updateDate) || !ticker.changeFromPrevClosePrice
        ? fluctuatePrice(fluctuatedPrice)
        : ticker.prevDayClosePrice || fluctuatedPrice
      ).toFixed(2),
    );

    // Calculate the change from yesterday in price
    const changeFromPrevClosePrice = parseFloat((fluctuatedPrice - prevDayClosePrice).toFixed(2));

    // Calculate the change from yesterday in percent
    const changeFromPrevClosePercent = parseFloat(((changeFromPrevClosePrice / fluctuatedPrice) * 100).toFixed(2));

    // Update the ticker
    const updatedTicker: Ticker = {
      ...ticker,
      closePrice: fluctuatedPrice,
      prevDayClosePrice,
      updateDate: new Date(),
      changeFromPrevClosePrice,
      changeFromPrevClosePercent,
    };

    await this.tickerCollection.doc(ticker.id).insert(updatedTicker, txId);
  }

  private async getAllTickers(): Promise<Array<Ticker>> {
    return await this.tickerCollection.query().dereference().snapshot();
  }

  private async getAllTickersMap(): Promise<Record<string, Ticker>> {
    const allTickers = await this.getAllTickers();
    return allTickers.reduce(
      (acc, ticker) => {
        acc[ticker.id] = ticker;
        return acc;
      },
      {} as Record<string, Ticker>,
    );
  }
}
