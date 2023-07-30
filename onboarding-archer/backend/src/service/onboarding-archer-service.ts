import { scheduler, secureDatabase, SquidService } from "@squidcloud/backend";
import { CronExpression } from "@squidcloud/common";
import { ALL_TICKERS, Ticker, UserProfile } from "common/common-types";
import {
  fluctuatePrice,
  getRandomNumber,
  isSameDate,
} from "../utils/ticker.utils"; // noinspection JSUnusedGlobalSymbols

// noinspection JSUnusedGlobalSymbols
export class OnboardingArcherService extends SquidService {
  private readonly tickerCollection = this.squid.collection<Ticker>("ticker");
  private readonly userProfileCollection =
    this.squid.collection<UserProfile>("userProfile");

  @secureDatabase("all", "built_in_db")
  allowAllAccessToBuiltInDb(): boolean {
    return true;
  }

  @scheduler("initializeUserProfileJob", CronExpression.EVERY_10_SECONDS, true)
  async initializeUserProfileJob(): Promise<void> {
    console.log("Running initializeUserProfileJob...");
    const userId = "defaultUser";
    const doc = this.userProfileCollection.doc(userId);
    const userProfileRef = await doc.snapshot();
    if (userProfileRef) return;

    // Initializing the user's profile with $100,000 balance
    await doc.insert({ id: userId, balance: 100_000 });
  }

  @scheduler("generateTickerPricesJob", CronExpression.EVERY_10_SECONDS, true)
  async generateTickerPricesJob(): Promise<void> {
    console.log(`${new Date().toLocaleTimeString()} Updating tickers...`);
    const allTickersInDb = await this.tickerCollection
      .query()
      .dereference()
      .snapshot();
    const allTickers = allTickersInDb.length ? allTickersInDb : ALL_TICKERS;
    await this.squid.runInTransaction(async (txId) => {
      allTickers.forEach((ticker) => {
        const closePrice = ticker.closePrice || getRandomNumber(10, 130);

        let fluctuatedPrice = -1;
        // Make sure the price is not negative
        while (fluctuatedPrice < 0) {
          fluctuatedPrice = fluctuatePrice(closePrice);
        }

        // Calculate previous close's price
        const prevDayClosePrice = parseFloat(
          (!ticker.closePrice ||
          !isSameDate(ticker.updateDate) ||
          !ticker.changeFromPrevClosePrice
            ? fluctuatePrice(fluctuatedPrice)
            : ticker.prevDayClosePrice || fluctuatedPrice
          ).toFixed(2)
        );

        // Calculate the change from yesterday in price
        const changeFromPrevClosePrice = parseFloat(
          (fluctuatedPrice - prevDayClosePrice).toFixed(2)
        );

        // Calculate the change from yesterday in percent
        const changeFromPrevClosePercent = parseFloat(
          ((changeFromPrevClosePrice / fluctuatedPrice) * 100).toFixed(2)
        );

        // Update the ticker
        const updatedTicker: Ticker = {
          ...ticker,
          closePrice: fluctuatedPrice,
          prevDayClosePrice,
          updateDate: new Date(),
          changeFromPrevClosePrice,
          changeFromPrevClosePercent,
        };
        this.tickerCollection.doc(ticker.id).insert(updatedTicker, txId);
      });
    });
  }
}
