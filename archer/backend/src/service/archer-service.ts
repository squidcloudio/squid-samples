import { executable, scheduler, secureApi, secureDatabase, SquidService } from '@squidcloud/backend';
import {
  ArcherUser,
  DenyList,
  MarketStatusResponse,
  PortfolioValueHistory,
  RelevantTicker,
  SnapshotsResponse,
  SnapshotTicker,
  Ticker,
  TickerDetailsResponse,
  TickerResults,
  TickersResponse,
  UserAsset,
} from 'archer-common';
import { CollectionReference, CronExpression } from '@squidcloud/client';
import { PromisePool } from '@supercharge/promise-pool';
import _ from 'lodash';

// noinspection JSUnusedGlobalSymbols
export class ArcherService extends SquidService {
  @secureDatabase('all', 'built_in_db')
  @secureApi('polygon', 'gainers')
  @secureApi('polygon', 'losers')
  @secureApi('polygon', 'aggregatesBar')
  allowAllAccessToBuiltInDb(): boolean {
    return true;
  }

  @scheduler('cacheTickerDetails', CronExpression.EVERY_2_HOURS, true)
  async cacheTickerDetails(): Promise<void> {
    console.log('Caching ticker details...');
    if (!(await this.isMarketOpen())) {
      return;
    }

    // Get all tickers from polygon
    const snapshotTickers = await this.getSnapshotTickers();

    // convert snapshotResponse to a record from ticker to entire object, use a for loop instead of reduce
    const tickerToSnapshot = this.convertSnapshotTickersToMap(snapshotTickers);

    // Get all tickers from DB
    const allTickers = await this.getAllTickersMap();
    const denyList = await this.getDenyList();
    let c = 0;

    // Chunk snapshots
    const tickerChunks = _.chunk(snapshotTickers, 100);

    const tickerCollection = this.getTickerCollection();
    for (const tickerChunk of tickerChunks) {
      await this.squid.runInTransaction(async (transactionId) => {
        await PromisePool.for(tickerChunk)
          .handleError(async (error, ticker) => {
            console.error('Unable to process ticker', error);
            const denyListCollection = this.getDenyListCollection();
            await denyListCollection.doc(ticker.ticker).insert(
              {
                tickerId: ticker.ticker,
              },
              transactionId,
            );
          })
          .withConcurrency(10)
          .process(async (ticker) => {
            console.log(`(${++c}/${snapshotTickers.length}): ${ticker.ticker}`);
            if (denyList.has(ticker.ticker)) {
              console.log(`${ticker.ticker} is in the deny list, skipping...`);
              return;
            }
            const tickerSnapshot = tickerToSnapshot[ticker.ticker];
            if (!tickerSnapshot || allTickers[ticker.ticker]) return;
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
              volume: tickerSnapshot.day.v,
              volumeWeighted: tickerSnapshot.day.vw,
              prevDayClosePrice: tickerSnapshot.prevDay.c,
              prevDayOpenPrice: tickerSnapshot.prevDay.o,
              todaysChange: tickerSnapshot.todaysChange,
              todaysChangePerc: tickerSnapshot.todaysChangePerc,
              totalEmployees: tickerDetailsResponse.total_employees,
              sicCode: tickerDetailsResponse.sic_code,
              sicDescription: tickerDetailsResponse.sic_description,
            };
            const docRef = tickerCollection.doc(ticker.ticker);
            await docRef.insert(allTickers[ticker.ticker], transactionId);
          });
      });
    }
    console.log('Done caching ticker details!');
  }

  @scheduler('updateTickerPrices', '*/20 * * * * *', true)
  async updateTickerPrices(): Promise<void> {
    if (!(await this.isMarketOpen())) {
      return;
    }
    const startTime = Date.now();
    console.log('Updating ticker prices...');
    // Get all tickers from polygon
    const snapshotTickers = await this.getSnapshotTickers();
    if (!snapshotTickers.length) return;
    const snapshotPartitions = _.chunk(snapshotTickers, 100);
    const tickerCollection = this.getTickerCollection();
    await PromisePool.for(snapshotPartitions)
      .handleError((error) => {
        console.log('Unable to handle snapshot partition', error);
      })
      .withConcurrency(1)
      .process(async (snapshotPartition, i) => {
        const start = Date.now();
        await this.squid.runInTransaction(async (transactionId) => {
          for (const ticker of snapshotPartition) {
            const docRef = tickerCollection.doc(ticker.ticker);
            await docRef.update(
              {
                closePrice: ticker.min?.c || ticker.lastTrade?.p || ticker.day.c || ticker.prevDay.c,
                openPrice: ticker.day.o,
                volume: ticker.day.v,
                volumeWeighted: ticker.day.vw,
                prevDayClosePrice: ticker.prevDay.c,
                prevDayOpenPrice: ticker.prevDay.o,
                todaysChange: ticker.todaysChange,
                todaysChangePerc: ticker.todaysChangePerc,
              },
              transactionId,
            );
          }
        });
        console.log(`Handling snapshot partition ${i + 1}/${snapshotPartitions.length}, took: ${Date.now() - start}ms`);
      });

    console.log('All done! Snapshots took: ', Date.now() - startTime, 'ms');
  }

  @scheduler('updatePortfolioValueHistory', CronExpression.EVERY_10_SECONDS, true)
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

  private async getAllTickersMap(): Promise<Record<string, Ticker>> {
    return (await this.getTickerCollection().query().limit(20000).snapshot()).reduce(
      (acc, item) => {
        const data = item.data;
        acc[data.id] = data;
        return acc;
      },
      {} as Record<string, Ticker>,
    );
  }

  private async getDenyList(): Promise<Set<string>> {
    return new Set((await this.getDenyListCollection().query().limit(20000).snapshot()).map((dl) => dl.data.tickerId));
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
    const tickerRef = await this.getTickerCollection().doc(tickerId).snapshot();
    if (!tickerRef) {
      throw new Error('Ticker not found');
    }
    const price = tickerRef.closePrice;
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
      await this.getUserCollection().doc(userId).decrementInPath('balance', totalPrice, txId);
      if (currentAssetRef) {
        const currentQuantity = currentAssetRef.data.quantity;
        const newQuantity = currentQuantity + quantity;
        if (newQuantity <= 0) {
          await currentAssetRef.delete(txId);
          return;
        }
        const currentAvgBuyPrice = currentAssetRef.data.avgBuyPrice;
        const newAvgBuyPrice = (currentAvgBuyPrice * currentQuantity + totalPrice) / newQuantity;

        await currentAssetRef.update({ quantity: newQuantity, avgBuyPrice: newAvgBuyPrice }, txId);
      } else {
        const id = `${userId}-${tickerId}`;
        await this.getUserAssetCollection().doc(id).insert(
          {
            userId,
            tickerId,
            quantity,
            avgBuyPrice: price,
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

  private getRelevantTickerCollection(): CollectionReference<RelevantTicker> {
    return this.squid.collection<RelevantTicker>('relevantTicker');
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
    return user;
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

  private async getSnapshotTickers(): Promise<SnapshotTicker[]> {
    const relevantTickers: Array<string> = await this.maybePopulateRelevantTickers();
    const relevantTickersSet = new Set(relevantTickers);

    // Get all tickers from polygon
    return (await this.squid.callApi<SnapshotsResponse>('polygon', 'tickersSnapshot')).tickers.filter((ticker) =>
      relevantTickersSet.has(ticker.ticker),
    );
  }

  private convertSnapshotTickersToMap(tickers: SnapshotTicker[]): Record<string, SnapshotTicker> {
    const map: Record<string, SnapshotTicker> = {};
    for (const ticker of tickers) {
      map[ticker.ticker] = ticker;
    }
    return map;
  }

  private async maybePopulateRelevantTickers(): Promise<string[]> {
    const collection = this.getRelevantTickerCollection();
    const relevantTickersRef = await collection.query().limit(20000).snapshot();
    if (relevantTickersRef.length) {
      return relevantTickersRef.map((item) => item.data.id);
    }

    // Right now we only populate NASDAQ tickers
    const tickerResults = await this.getExchangesTickers(['XNAS', 'XNYS']);
    const tickers = tickerResults.map((item) => item.ticker);
    const chunkedTickers = _.chunk(tickers, 1000);
    for (const tickerChunk of chunkedTickers) {
      await this.squid.runInTransaction(async (txId) => {
        for (const tickerId of tickerChunk) {
          await collection.doc(tickerId).insert({ id: tickerId }, txId);
        }
      });
    }
    return tickers;
  }

  private async getExchangesTickers(exchanges: string[]): Promise<TickerResults[]> {
    let c = 0;
    const allResults: TickerResults[] = [];

    for (const exchange of exchanges) {
      const exchangeResults: TickerResults[] = [];
      while (true) {
        const request = {
          market: 'stocks',
          type: 'CS',
          exchange,
          sort: 'ticker',
          limit: 1000,
          order: 'asc',
        };
        const lastResult = exchangeResults[exchangeResults.length - 1];
        if (lastResult) {
          request['ticker.gt'] = lastResult.ticker;
        }
        const results = (await this.squid.callApi<TickersResponse>('polygon', 'tickers', request)).results;
        console.log(`Fetched results ${++c} (${exchange}): `, results.length, lastResult?.ticker || '');
        exchangeResults.push(...results);
        if (results.length < 1000) {
          allResults.push(...exchangeResults);
          break;
        }
      }
    }
    return allResults;
  }
}
