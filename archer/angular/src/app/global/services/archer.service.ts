import { Injectable } from '@angular/core';
import { CollectionReference, DocumentReference, SnapshotEmitter, Squid } from '@squidcloud/client';
import {
  ArcherUser,
  PortfolioValueHistory,
  SnapshotsResponse,
  Ticker,
  TimeFrame,
  UserAsset,
  UserAssetWithTicker,
} from 'archer-common';
import {
  BehaviorSubject,
  distinctUntilChanged,
  filter,
  from,
  map,
  NEVER,
  Observable,
  of,
  shareReplay,
  switchMap,
  timer,
} from 'rxjs';
import { AuthService } from '@auth0/auth0-angular';

@Injectable({
  providedIn: 'root',
})
export class ArcherService {
  private readonly userSubject = new BehaviorSubject<ArcherUser | undefined | null>(undefined);
  private readonly portfolioHistorySubject = new BehaviorSubject<PortfolioValueHistory[]>([]);
  private readonly userAssetsSubject = new BehaviorSubject<UserAssetWithTicker[] | undefined>(undefined);
  private readonly tickerIdsToObserve = new BehaviorSubject<Set<string>>(new Set());
  private readonly tickersSubject = new BehaviorSubject<Ticker[] | undefined>(undefined);
  private gainersAndLosersObs = timer(0, 60_000 /* every minute */).pipe(
    switchMap(() => {
      return from(
        Promise.all([
          this.squid.callApi<SnapshotsResponse>('polygon', 'gainers'),
          this.squid.callApi<SnapshotsResponse>('polygon', 'losers'),
        ]),
      ).pipe(
        switchMap(([gainers, losers]) => {
          const tickerIds = new Set<string>();
          gainers.tickers.forEach((ticker) => tickerIds.add(ticker.ticker));
          losers.tickers.forEach((ticker) => tickerIds.add(ticker.ticker));
          return this.observeTickers(Array.from(tickerIds));
        }),
      );
    }),
    shareReplay(1),
  );

  constructor(
    private readonly squid: Squid,
    private readonly authService: AuthService,
  ) {
    this.authService.user$
      .pipe(
        switchMap((auth0User) => {
          if (auth0User === undefined) return NEVER;
          if (!auth0User) return of(undefined);
          return this.getUserCollection()
            .doc(auth0User.sub)
            .snapshots()
            .pipe(
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
      )
      .subscribe((archerUser) => {
        this.userSubject.next(archerUser);
      });

    this.userSubject
      .pipe(
        switchMap((user) => {
          if (!user) return NEVER;
          return this.getUserAssetCollection()
            .joinQuery('userAsset')
            .where('userId', '==', user.id)
            .sortBy('tickerId')
            .join(this.getTickerCollection().query(), 'ticker', { left: 'tickerId', right: 'id' })
            .dereference()
            .grouped()
            .snapshots()
            .pipe(
              map((assetsWithTickers) => {
                return assetsWithTickers.map((assetWithTickers) => {
                  const userAssertWithOneTicker: UserAssetWithTicker = {
                    ticker: assetWithTickers.ticker[0],
                    holding: assetWithTickers.userAsset,
                  };
                  return userAssertWithOneTicker;
                });
              }),
            );
        }),
      )
      .subscribe((userAssets) => {
        this.userAssetsSubject.next(userAssets);
      });

    this.userSubject
      .pipe(
        switchMap((user) => {
          if (!user) return NEVER;
          return this.getPortfolioValueHistoryCollection()
            .query()
            .where('userId', '==', user.id)
            .sortBy('date')
            .snapshots();
        }),
        map((snapshots) => snapshots.map((snapshot) => snapshot.data)),
      )
      .subscribe((portfolioValueHistory) => {
        this.portfolioHistorySubject.next(portfolioValueHistory);
      });

    this.tickerIdsToObserve
      .pipe(
        switchMap((tickerIdsToObserve) => {
          if (tickerIdsToObserve.size === 0) return of([]);
          return this.getTickerCollection()
            .query()
            .in('id', Array.from(tickerIdsToObserve))
            .snapshots()
            .pipe(map((tickers) => tickers.map((ticker) => ticker.data)));
        }),
      )
      .subscribe((tickers) => {
        this.tickersSubject.next(tickers);
      });
  }

  observeUserAssets(): Observable<Array<UserAssetWithTicker>> {
    return this.userAssetsSubject.pipe(filter(Boolean));
  }

  observeUserAsset(tickerId: string): Observable<UserAssetWithTicker | undefined> {
    return this.observeUserAssets().pipe(
      map((userAssetsWithTickers) =>
        userAssetsWithTickers.find((userAssetWithTicker) => userAssetWithTicker.holding.tickerId === tickerId),
      ),
    );
  }

  observeUser(): Observable<ArcherUser | undefined> {
    return this.userSubject.asObservable().pipe(
      filter((userAssets) => userAssets !== undefined),
      map((user) => user || undefined),
    );
  }

  observeTickers(tickerIds: Array<string>): Observable<Array<Ticker>> {
    const tickerIdsToObserveSet = this.tickerIdsToObserve.value;
    let hasChanged = false;
    for (const tickerId of tickerIds) {
      if (tickerIdsToObserveSet.has(tickerId)) continue;
      hasChanged = true;
      tickerIdsToObserveSet.add(tickerId);
    }

    if (hasChanged) {
      this.tickerIdsToObserve.next(tickerIdsToObserveSet);
    }

    return this.tickersSubject.pipe(
      filter((tickers) => tickers !== undefined),
      map((tickers) => {
        return (tickers || []).filter((ticker) => tickerIds.includes(ticker.id));
      }),
    );
  }

  observeTicker(tickerId: string): Observable<Ticker | undefined> {
    return this.observeTickers([tickerId]).pipe(
      map((tickers) => tickers[0]),
      distinctUntilChanged(),
    );
  }

  async buyAsset(tickerId: string, quantity: number): Promise<void> {
    return this.squid.executeFunction('buyAsset', tickerId, quantity);
  }

  async sellAsset(tickerId: string, quantity: number): Promise<void> {
    return this.squid.executeFunction('sellAsset', tickerId, quantity);
  }

  observeGainersAndLosers(): Observable<Ticker[]> {
    return this.gainersAndLosersObs;
  }

  async searchTickers(query: string): Promise<Ticker[]> {
    const results = await (
      this.getTickerCollection().or(
        this.getTickerCollection().query().like('id', `%${query}%`, false).limit(100).sortBy('id'),
        this.getTickerCollection().query().like('name', `%${query}%`, false).limit(100).sortBy('id'),
      ) as SnapshotEmitter<DocumentReference<Ticker>>
    ).snapshot();
    return results.map((result) => result.data);
  }

  getPortfolioValueHistory(
    timeFrame: '1d' | '1w' | '1m' | '3m' | '1y',
    numDataPoints: number,
  ): Observable<Array<{ date: Date; value: number }>> {
    return this.portfolioHistorySubject.pipe(
      filter(Boolean),
      // Convert the DocumentReference to the actual data and filter based on time frame.
      map((results) => {
        return results
          .map((result) => {
            return {
              date: result.date,
              value: result.value,
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
