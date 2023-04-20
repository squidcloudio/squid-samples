import { executable, scheduler, secureDatabase, SquidService } from '@squidcloud/backend';
import { CronExpression } from '@squidcloud/common';
import {
  ArcherUser,
  DenyList,
  MarketStatusResponse,
  PortfolioValueHistory,
  SnapshotsResponse,
  SnapshotTicker,
  Ticker,
  TickerDetailsResponse,
  UserAsset,
} from 'archer-common';
import { CollectionReference } from '@squidcloud/client';
import { PromisePool } from '@supercharge/promise-pool';

// noinspection JSUnusedGlobalSymbols
export class ArcherService extends SquidService {
  // TODO: update this
  @secureDatabase('all', 'built_in_db')
  allowAllAccessToBuiltInDb(): boolean {
    return true;
  }

  @scheduler('cacheTickerDetails', CronExpression.EVERY_2_HOURS)
  async cacheTickerDetails(): Promise<void> {
    /*if (!(await this.isMarketOpen())) {
      return;
    }*/

    const tickerCollection = this.getTickerCollection();

    // Get all tickers from polygon
    const snapshotsResponse = await this.squid.callApi<SnapshotsResponse>('polygon', 'tickersSnapshot');
    // convert snapshotResponse to a record from ticker to entire object, use a for loop instead of reduce
    const tickerToSnapshot = snapshotsResponse.tickers.reduce((acc, ticker) => {
      acc[ticker.ticker] = ticker;
      return acc;
    }, {} as Record<string, SnapshotTicker>);

    // Get all tickers from DB
    console.log('Getting all tickers...');
    const allTickers = await this.getAllTickersMap();
    console.log('Got all tickers');
    const denyList = await this.getDenyList();
    let c = 0;

    await PromisePool.for(snapshotsResponse.tickers)
      .handleError((error, ticker) => {
        console.error('Unable to process ticker', error);
        const denyListCollection = this.getDenyListCollection();
        denyListCollection
          .doc(ticker.ticker)
          .insert({
            tickerId: ticker.ticker,
          })
          .then();
      })
      .withConcurrency(10)
      .process(async (ticker) => {
        console.log(`(${++c}/${snapshotsResponse.tickers.length}): ${ticker.ticker}`);
        if (denyList.has(ticker.ticker)) {
          console.log(`${ticker.ticker} is in the deny list, skipping...`);
          return;
        }
        let insert = false;
        const tickerSnapshot = tickerToSnapshot[ticker.ticker];
        if (!tickerSnapshot) return;
        if (!allTickers[ticker.ticker]) {
          console.log("Can't find ticker information for: ", ticker.ticker);
          insert = true;
          // If ticker does not exist in DB, call tickerDetails API, fill in information
          const { results: tickerDetailsResponse } = await this.squid.callApi<TickerDetailsResponse>(
            'polygon',
            'tickerDetails',
            {
              tickerId: ticker.ticker,
            },
          );

          allTickers[ticker.ticker] = {
            id: ticker.ticker,
            name: tickerDetailsResponse.name,
            address: tickerDetailsResponse.address,
            description: tickerDetailsResponse.description,
            homepageUrl: tickerDetailsResponse.homepage_url,
            phoneNumber: tickerDetailsResponse.phone_number,
            listDate: tickerDetailsResponse.list_date,
            marketCap: tickerDetailsResponse.market_cap,
            exchange: tickerDetailsResponse.primary_exchange,
            closePrice: tickerSnapshot.day.c,
            openPrice: tickerSnapshot.day.o,
            todaysChange: tickerSnapshot.todaysChange,
            todaysChangePerc: tickerSnapshot.todaysChangePerc,
          };
        }

        const docRef = tickerCollection.doc(ticker.ticker);
        if (insert) {
          await docRef.insert(allTickers[ticker.ticker]);
        } else {
          await docRef.update({
            ...allTickers[ticker.ticker],
            closePrice: tickerSnapshot.day.c,
            openPrice: tickerSnapshot.day.o,
            todaysChange: tickerSnapshot.todaysChange,
            todaysChangePerc: tickerSnapshot.todaysChangePerc,
          });
        }
      });
  }

  private async getAllTickersMap(): Promise<Record<string, Ticker>> {
    return (await this.getTickerCollection().query().limit(20000).snapshot()).reduce((acc, item) => {
      const data = item.data;
      acc[data.id] = data;
      return acc;
    }, {} as Record<string, Ticker>);
  }

  private async getDenyList(): Promise<Set<string>> {
    return new Set((await this.getDenyListCollection().query().limit(20000).snapshot()).map((dl) => dl.data.tickerId));
  }

  @scheduler('updatePortfolioValueHistory', CronExpression.EVERY_5_SECONDS)
  async updatePortfolioValueHistory(): Promise<void> {
    if (!(await this.isMarketOpen())) {
      return;
    }

    const userCollection = this.getUserCollection();
    const portfolioValueHistoryCollection = this.getPortfolioValueHistoryCollection();

    const users = await userCollection.query().snapshot();
    const tickerMap = await this.getAllTickersMap();
    for (const user of users) {
      const portfolioValue = await this.getPortfolioValue(user.data.id, tickerMap);
      await portfolioValueHistoryCollection
        .doc()
        .insert({
          userId: user.data.id,
          value: portfolioValue,
          date: new Date(),
        })
        .then();
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
    const tickerRef = await this.getTickerCollection().doc(tickerId);
    if (!tickerRef) {
      throw new Error('Ticker not found');
    }
    const price = tickerRef.data.closePrice;
    const totalPrice = price * quantity;

    if (totalPrice > user.balance) {
      throw new Error('Insufficient funds');
    }
    const [currentAssetRef] = await this.getUserAssetCollection()
      .query()
      .eq('tickerId', tickerId)
      .eq('userId', userId)
      .snapshot();
    await this.squid.runInTransaction(async (txId) => {
      await this.getUserCollection()
        .doc(userId)
        .update({ balance: user.balance - totalPrice }, txId);
      if (currentAssetRef) {
        const newQuantity = currentAssetRef.data.quantity + quantity;
        if (newQuantity <= 0) {
          await currentAssetRef.delete(txId);
          return;
        }
        await currentAssetRef.update({ quantity: newQuantity }, txId);
      } else {
        const id = `${userId}-${tickerId}`;
        await this.getUserAssetCollection().doc(id).insert(
          {
            id,
            userId,
            tickerId,
            quantity,
          },
          txId,
        );
      }
    });
  }

  private getTickerCollection(): CollectionReference<Ticker> {
    return this.squid.collection<Ticker>('ticker');
  }

  private getDenyListCollection(): CollectionReference<DenyList> {
    return this.squid.collection<DenyList>('denyList');
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
    const userAssets = (await this.getUserAssetCollection().query().eq('userId', userId).snapshot()).map(
      (item) => item.data,
    );
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
