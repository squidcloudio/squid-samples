import { Injectable } from '@angular/core';
import { CollectionReference, Squid } from '@squidcloud/client';
import {
  ArcherUser,
  PortfolioValueHistory,
  SnapshotsResponse,
  Ticker,
  TimeFrame,
  UserAsset,
  UserAssetWithTicker,
} from 'archer-common';
import { filter, from, map, NEVER, Observable, of, share, switchMap } from 'rxjs';
import { AuthService } from '@auth0/auth0-angular';

@Injectable({
  providedIn: 'root',
})
export class ArcherService {
  private readonly userObs: Observable<ArcherUser | undefined> = this.authService.user$.pipe(
    switchMap((auth0User) => {
      if (auth0User === undefined) return NEVER;
      if (!auth0User) return of(undefined);
      return this.getUserCollection()
        .doc(auth0User.sub)
        .snapshots()
        .pipe(
          map((snapshot) => {
            return snapshot?.data;
          }),
          switchMap((archerUser) => {
            if (!archerUser) {
              // TODO: Move this to executable
              this.getUserCollection()
                .doc(auth0User.sub)
                .insert({
                  id: auth0User.sub!,
                  email: auth0User.email!,
                  emailVerified: auth0User.email_verified!,
                  name: auth0User.name!,
                  picture: auth0User.picture,
                  balance: 1000000,
                })
                .then();
              return NEVER;
            }
            return of(archerUser);
          }),
        );
    }),
  );

  private readonly portfolioHistory = this.userObs.pipe(
    switchMap((user) => {
      if (!user) return NEVER;
      return this.getPortfolioValueHistoryCollection()
        .query()
        .where('userId', '==', user.id)
        .sortBy('date')
        .snapshots();
    }),
  );

  private readonly userAssetsObs: Observable<Array<UserAssetWithTicker>> = this.getUserAssetCollection()
    .joinQuery('userAsset')
    .sortBy('tickerId')
    .join(this.getTickerCollection().joinQuery('ticker'), 'tickerId', 'id')
    .snapshots()
    .pipe(
      map((snapshots) => {
        const assets: Array<UserAssetWithTicker> = [];
        for (const row of snapshots) {
          const ticker = row['ticker'];
          const userAsset = row['userAsset'];
          assets.push({ ...userAsset.data, ticker: ticker!.data });
        }
        return assets;
      }),
    );

  constructor(private readonly squid: Squid, private readonly authService: AuthService) {}

  observeUserAssets(): Observable<Array<UserAssetWithTicker>> {
    return this.userAssetsObs;
  }

  observeUserAsset(tickerId: string): Observable<UserAssetWithTicker | undefined> {
    return this.userAssetsObs.pipe(
      map((userAssets) => userAssets.find((userAsset) => userAsset.tickerId === tickerId)),
    );
  }

  observeUser(): Observable<ArcherUser | undefined> {
    return this.userObs;
  }

  observeTickers(tickerIds: Array<string>): Observable<Array<Ticker>> {
    return this.getTickerCollection()
      .query()
      .in('id', Array.from(tickerIds))
      .snapshots()
      .pipe(map((tickers) => tickers.map((ticker) => ticker.data)));
  }

  observeTicker(tickerId: string): Observable<Ticker | undefined> {
    return this.observeTickers([tickerId]).pipe(map((tickers) => tickers[0]));
  }

  async buyAsset(tickerId: string, quantity: number): Promise<void> {
    return this.squid.executeFunction('buyAsset', tickerId, quantity);
  }

  async sellAsset(tickerId: string, quantity: number): Promise<void> {
    return this.squid.executeFunction('sellAsset', tickerId, quantity);
  }

  observeGainersAndLosers(): Observable<Ticker[]> {
    const gainersAndLosersPromise = Promise.all([
      this.squid.callApi<SnapshotsResponse>('polygon', 'gainers'),
      this.squid.callApi<SnapshotsResponse>('polygon', 'losers'),
    ]);

    return from(gainersAndLosersPromise).pipe(
      switchMap(([gainers, losers]) => {
        const tickerIds = new Set<string>();
        gainers.tickers.forEach((ticker) => tickerIds.add(ticker.ticker));
        losers.tickers.forEach((ticker) => tickerIds.add(ticker.ticker));

        return this.observeTickers(Array.from(tickerIds));
      }),
    );
  }

  async searchTickers(query: string): Promise<Ticker[]> {
    const results = await this.getTickerCollection()
      .or(
        this.getTickerCollection().query().like('id', `%${query}%`, false).limit(100).sortBy('id'),
        this.getTickerCollection().query().like('name', `%${query}%`, false).limit(100).sortBy('id'),
      )
      .snapshot();
    return results.map((result) => result.data);
  }

  getPortfolioValueHistory(
    timeFrame: '1d' | '1w' | '1m' | '3m' | '1y',
    numDataPoints: number,
  ): Observable<Array<{ date: Date; value: number }>> {
    return this.portfolioHistory.pipe(
      filter(Boolean),
      // Convert the DocumentReference to the actual data and filter based on time frame.
      map((results) => {
        return results
          .map((result) => {
            return {
              date: result.data.date,
              value: result.data.value,
            };
          })
          .filter((result) => result.date.getTime() > Date.now() - this.getTimeFrameMs(timeFrame));
      }),
      map((history) => {
        const timeIntervals = this.getTimeIntervals(timeFrame, numDataPoints);
        const aggregatedHistory: Array<{ date: Date; value: number }> = [];

        let currentIntervalIndex = 0;
        let currentValue = 0;

        for (const record of history) {
          while (
            currentIntervalIndex < numDataPoints - 1 &&
            record.date.getTime() > timeIntervals[currentIntervalIndex + 1]
          ) {
            aggregatedHistory.push({ date: new Date(timeIntervals[currentIntervalIndex]), value: currentValue });
            currentIntervalIndex++;
            currentValue = 0; // Reset the value for the next interval
          }
          currentValue += record.value;
        }

        // Add the remaining data points
        while (currentIntervalIndex < numDataPoints) {
          aggregatedHistory.push({ date: new Date(timeIntervals[currentIntervalIndex]), value: currentValue });
          currentIntervalIndex++;
          currentValue = 0; // Reset the value for the next interval
        }

        return aggregatedHistory;
      }),
    );
  }

  private roundTime(date: Date, intervalMs: number): Date {
    const intervalSec = intervalMs / 1000;
    const intervalMin = intervalSec / 60;
    const intervalHour = intervalMin / 60;
    const intervalDay = intervalHour / 24;

    const roundedDate = new Date(date);

    if (intervalDay >= 1) {
      roundedDate.setUTCHours(0, 0, 0, 0); // Beginning of the day
    } else if (intervalHour >= 1) {
      roundedDate.setUTCMinutes(0, 0, 0); // Beginning of the hour
    } else if (intervalMin >= 5) {
      const roundedMinutes = 5 * Math.floor(roundedDate.getUTCMinutes() / 5);
      roundedDate.setUTCMinutes(roundedMinutes, 0, 0); // 5-minute rounding
    } else if (intervalMin >= 1) {
      roundedDate.setUTCSeconds(0, 0); // Beginning of the minute
    }

    return roundedDate;
  }

  private getTimeIntervals(timeFrame: TimeFrame, numDataPoints: number): number[] {
    const now = Date.now();
    const timeFrameMs = this.getTimeFrameMs(timeFrame);

    const intervalsPerPeriod: Record<TimeFrame, number> = {
      '1d': numDataPoints,
      '1w': 7,
      '1m': 30,
      '3m': 13, // 12 weeks + 1 extra point
      '1y': 12,
    };

    const intervals = new Array(numDataPoints);

    const numIntervals = intervalsPerPeriod[timeFrame];
    const baseIntervalMs = timeFrameMs / numIntervals;
    const extraPoints = numDataPoints - numIntervals;

    for (let i = 0; i < numIntervals; i++) {
      const unroundedIntervalStart = now - (i + 1) * baseIntervalMs;
      const intervalStart = this.roundTime(new Date(unroundedIntervalStart), baseIntervalMs);
      intervals[i] = intervalStart.getTime();
    }

    // Spread extra points evenly on the last day
    if (extraPoints > 0) {
      const lastDayMs = baseIntervalMs / (extraPoints + 1);
      for (let i = 0; i < extraPoints; i++) {
        const unroundedIntervalStart = intervals[numIntervals - 1] - (i + 1) * lastDayMs;
        const intervalStart = this.roundTime(new Date(unroundedIntervalStart), lastDayMs);
        intervals[numIntervals + i] = intervalStart.getTime();
      }
    }

    return intervals.reverse();
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

  private getTimeFrameMs(timeFrame: TimeFrame) {
    return {
      '1d': 1000 * 60 * 60 * 24,
      '1w': 1000 * 60 * 60 * 24 * 7,
      '1m': 1000 * 60 * 60 * 24 * 30,
      '3m': 1000 * 60 * 60 * 24 * 30 * 3,
      '1y': 1000 * 60 * 60 * 24 * 365,
    }[timeFrame];
  }
}
