import { Injectable } from '@angular/core';
import { CollectionReference, Squid } from '@squidcloud/client';
import { ArcherUser, PortfolioValueHistory, Ticker, UserAsset, UserAssetWithTicker } from 'archer-common';
import { map, NEVER, Observable, of, share, switchMap } from 'rxjs';
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
      share(),
    );

  constructor(private readonly squid: Squid, private readonly authService: AuthService) {}

  observeUserAssets(): Observable<Array<UserAssetWithTicker>> {
    return this.userAssetsObs;
  }

  observeUser(): Observable<ArcherUser | undefined> {
    return this.userObs;
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
