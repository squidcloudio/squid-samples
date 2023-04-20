import { Injectable } from '@angular/core';
import { CollectionReference, Squid } from '@squidcloud/client';
import { ArcherUser, PortfolioValueHistory, Ticker, UserAsset } from 'archer-common';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ArcherService {
  // TODO: check if need to add a 'share()' pipe
  private readonly tickersObs = this.getTickerCollection()
    .query()
    .sortBy('id')
    .snapshots()
    .pipe(map((snapshots) => snapshots.map((snapshot) => snapshot.data)));

  constructor(private readonly squid: Squid) {}

  observeTickers(): Observable<Ticker[]> {
    return this.tickersObs;
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
