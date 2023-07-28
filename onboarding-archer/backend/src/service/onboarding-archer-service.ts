import { scheduler, secureDatabase, SquidService } from "@squidcloud/backend";
import { CronExpression } from "@squidcloud/common";
import { ALL_TICKERS, Ticker } from "common/common-types";

export class OnboardingArcherService extends SquidService {
  private readonly tickerCollection = this.squid.collection<Ticker>("ticker");

  // TODO: update this
  @secureDatabase("all", "built_in_db")
  allowAllAccessToBuiltInDb(): boolean {
    return true;
  }

  @scheduler("generateTickerPricesJob", CronExpression.EVERY_10_SECONDS)
  async generateTickerPricesJob(): Promise<void> {
    const allTickersInDb = await this.tickerCollection
      .query()
      .dereference()
      .snapshot();

    const allTickers = allTickersInDb.length ? allTickersInDb : ALL_TICKERS;
    console.log("Updating tickers...", allTickersInDb.length);
    await this.squid.runInTransaction(async (txId) => {
      allTickers.forEach((ticker) => {
        const updatedTicker = {
          ...ticker,
          currentPrice: this.generatePrice(ticker),
        };
        this.tickerCollection.doc(ticker.id).insert(updatedTicker, txId);
      });
    });
  }

  private generatePrice(ticker: Ticker): number {
    const currentPrice = ticker.currentPrice || this.getRandomNumber(10, 130);
    const percentChange = this.getRandomNumber(-0.02, 0.2);
    return currentPrice * (1 + percentChange);
  }

  private getRandomNumber(min: number, max: number): number {
    return Math.random() * (max - min + 1) + min;
  }
}
