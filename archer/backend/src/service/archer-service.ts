import { executable, scheduler, secureDatabase, SquidService } from '@squidcloud/backend';
import { CronExpression } from '@squidcloud/common';
import {
  ArcherUser,
  MarketStatusResponse,
  PortfolioValueHistory,
  SnapshotsResponse,
  Ticker,
  TickerDetailsResponse,
  UserAsset
} from 'archer-common';
import { CollectionReference } from '@squidcloud/client';

// noinspection JSUnusedGlobalSymbols
export class ArcherService extends SquidService {
  // TODO: update this
  @secureDatabase('all', 'built_in_db')
  allowAllAccessToBuiltInDb(): boolean {
    return true;
  }

  @scheduler('cacheTickerDetails', CronExpression.EVERY_5_SECONDS)
  async cacheTickerDetails(): Promise<void> {
    if (!await this.isMarketOpen()) {
      return;
    }

    const tickerCollection = this.getTickerCollection();

    // Get all tickers from polygon
    const snapshotsResponse = await this.squid.callApi<SnapshotsResponse>('polygon', 'tickersSnapshot');

    // Get all tickers from DB
    const allTickers = await this.getAllTickersMap();

    for (const snapshotTicker of snapshotsResponse.tickers) {
      let insert = false;
      if (!allTickers[snapshotTicker.ticker]) {
        insert = true;
        // If ticker does not exist in DB, call tickerDetails API, fill in information
        const { results: tickerDetailsResponse } = await this.squid.callApi<TickerDetailsResponse>('polygon', 'tickerDetails', {
          ticker: snapshotTicker.ticker
        });

        allTickers[snapshotTicker.ticker] = {
          id: snapshotTicker.ticker,
          name: tickerDetailsResponse.name,
          address: tickerDetailsResponse.address,
          description: tickerDetailsResponse.description,
          homepageUrl: tickerDetailsResponse.homepage_url,
          listDate: tickerDetailsResponse.list_date,
          marketCap: tickerDetailsResponse.market_cap,
          closePrice: snapshotTicker.day.c,
          openPrice: snapshotTicker.day.o,
          todaysChange: snapshotTicker.todaysChange,
          todaysChangePerc: snapshotTicker.todaysChangePerc
        };
      }

      // Update the prices for all tickers
      allTickers[snapshotTicker.ticker] = {
        ...allTickers[snapshotTicker.ticker],
        closePrice: snapshotTicker.day.c,
        openPrice: snapshotTicker.day.o,
        todaysChange: snapshotTicker.todaysChange,
        todaysChangePerc: snapshotTicker.todaysChangePerc
      };

      const docRef = tickerCollection.doc(snapshotTicker.ticker);
      if (insert) {
        docRef.insert(allTickers[snapshotTicker.ticker]).then();
      } else {
        docRef.update(allTickers[snapshotTicker.ticker]).then();
      }
    }
  }

  private async getAllTickersMap(): Promise<Record<string, Ticker>> {
    return (await this.getTickerCollection().query().snapshot()).reduce((acc, item) => {
      const data = item.data;
      acc[data.id] = data;
      return acc;
    }, {} as Record<string, Ticker>);
  }

  @scheduler('updatePortfolioValueHistory', CronExpression.EVERY_5_SECONDS)
  async updatePortfolioValueHistory(): Promise<void> {
    if (!await this.isMarketOpen()) {
      return;
    }

    const userCollection = this.getUserCollection();
    const portfolioValueHistoryCollection = this.getPortfolioValueHistoryCollection();

    const users = await userCollection.query().snapshot();
    const tickers = await this.getAllTickersMap();
    for (const user of users) {
      const portfolioValue = await this.getPortfolioValue(user.data.id, tickers);
      await portfolioValueHistoryCollection.doc().insert({
        userId: user.data.id,
        value: portfolioValue,
        date: new Date()
      }).then();
    }
  }

  @executable()
  async buyAsset(tickerId: string, quantity: number): Promise<void> {
    await this.incrementAssetQuantity(tickerId, quantity);
  }

  @executable()
  async sellAsset(tickerId: string, quantity: number): Promise<void> {
    await this.incrementAssetQuantity(tickerId, -quantity);
  }

  private async incrementAssetQuantity(tickerId: string, quantity: number): Promise<void> {
    const user = await this.getArcherUser();
    const userId = user.id;
    const tickerDetails = await this.getTickerCollection().doc(tickerId);
    if (!tickerDetails) {
      throw new Error('Ticker not found');
    }
    const price = tickerDetails.data.closePrice;
    const totalPrice = price * quantity;

    if (totalPrice > user.balance) {
      throw new Error('Insufficient funds');
    }
    const [currentAssetRef] = (await this.getUserAssetCollection().query()
      .eq('tickerId', tickerId)
      .eq('userId', userId)
      .snapshot());
    await this.squid.runInTransaction(async (txId) => {
      await this.getUserCollection().doc(userId).update({ balance: user.balance - totalPrice }, txId);
      if (currentAssetRef) {
        const newQuantity = currentAssetRef.data.quantity + quantity;
        if (newQuantity <= 0) {
          await currentAssetRef.delete(txId);
          return;
        }
        await currentAssetRef.update({ quantity: newQuantity }, txId);
      } else {
        const id = `${userId}-${tickerId}`;
        await this.getUserAssetCollection().doc(id).insert({
          id,
          userId,
          tickerId,
          quantity
        }, txId);
      }
    });
  }

  private getTickerCollection(): CollectionReference<Ticker> {
    return this.squid.collection<Ticker>('ticker');
  }

  private getUserAssetCollection(): CollectionReference<UserAsset> {
    return this.squid.collection<UserAsset>('userAsset');
  }

  private getUserCollection(): CollectionReference<ArcherUser> {
    return this.squid.collection<ArcherUser>('user');
  }

  private getPortfolioValueHistoryCollection(): CollectionReference<PortfolioValueHistory> {
    return this.squid.collection<PortfolioValueHistory>('portfolioValueHistory');
  }

  private async getArcherUser(): Promise<ArcherUser> {
    const userId = this.getUserAuth()?.userId;
    if (!userId) {
      throw new Error('User not authenticated');
    }
    const user = await this.getUserCollection().doc(userId).snapshot();
    if (!user) {
      throw new Error('User not found');
    }
    return user.data;
  }

  private async getPortfolioValue(userId: string, tickers: Record<string, Ticker>): Promise<number> {
    const userAssets = (await this.getUserAssetCollection().query().eq('userId', userId).snapshot()).map(item => item.data);
    let acc = 0;
    for (const asset of userAssets) {
      const ticker = tickers[asset.tickerId];
      if (!ticker) {
        continue;
      }
      acc += ticker.closePrice * asset.quantity;
    }
    return acc;
  }

  private async isMarketOpen(): Promise<boolean> {
    const response = await this.squid.callApi<MarketStatusResponse>('polygon', 'marketStatus');
    return response.exchanges.nyse === 'open';
  }
}
