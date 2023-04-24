import { Injectable } from '@angular/core';
import { CollectionReference, Squid } from '@squidcloud/client';
import { ArcherUser, PortfolioValueHistory, Ticker, UserAsset } from 'archer-common';
import { map, Observable, share } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ArcherService {
  private readonly assetsObs = this.getUserAssetCollection()
    .query()
    .sortBy('tickerId')
    .snapshots()
    .pipe(
      map((snapshots) => snapshots.map((snapshot) => snapshot.data)),
      share(),
    );

  constructor(private readonly squid: Squid) {}

  observeAssets(): Observable<UserAsset[]> {
    return this.assetsObs;
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
