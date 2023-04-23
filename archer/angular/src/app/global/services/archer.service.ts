import { Injectable } from '@angular/core';
import { CollectionReference, Squid } from '@squidcloud/client';
import { ArcherUser, PortfolioValueHistory, Ticker, UserAsset } from 'archer-common';
import { map, Observable, share } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ArcherService {
  // TODO: check if need to add a 'share()' pipe
  private readonly tickersObs = this.getTickerCollection()
    .query()
    .limit(20000)
    .sortBy('id')
    .snapshots()
    .pipe(
      map((snapshots) => snapshots.map((snapshot) => snapshot.data)),
      share(),
    );

  private readonly assetsObs = this.getUserAssetCollection()
    .query()
    .sortBy('tickerId')
    .snapshots()
    .pipe(
      map((snapshots) => snapshots.map((snapshot) => snapshot.data)),
      share(),
    );

  constructor(private readonly squid: Squid) {}

  observeTickers(): Observable<Ticker[]> {
    return this.tickersObs;
  }

  observeAssets(): Observable<UserAsset[]> {
    return this.assetsObs;
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
}
