import { Injectable } from '@angular/core';
import { CollectionReference, Squid } from '@squidcloud/client';
import { ArcherUser, PortfolioValueHistory, Ticker, UserAsset } from 'archer-common';
import { combineLatest, firstValueFrom, map, Observable, share } from 'rxjs';
import { DocumentReference } from '@squidcloud/client/dist/typescript-client/src/document-reference';
import { DocumentData } from '@squidcloud/common';

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

  searchTickers(query: string): Promise<Ticker[]> {
    return firstValueFrom(
      or<Ticker>(
        [
          {
            fieldName: 'id',
            asc: true,
          },
        ],
        this.getTickerCollection().query().like('id', `%${query}%`, false).limit(100).sortBy('id').snapshots(false),
        this.getTickerCollection().query().like('name', `%${query}%`, false).limit(100).sortBy('id').snapshots(false),
      ).pipe(map((snapshots) => snapshots.map((snapshot) => snapshot.data))),
    );
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

type SortOrder = {
  fieldName: string;
  asc: boolean;
};

function or<T extends DocumentData>(
  sort: Array<SortOrder>,
  ...observables: Observable<Array<DocumentReference<T>>>[]
): Observable<Array<DocumentReference<T>>> {
  return combineLatest([...observables]).pipe(
    map((results) => {
      const seenData = new Set<T>();
      const flatResult = results.flat();
      const result: Array<DocumentReference<T>> = [];
      for (const docRef of flatResult) {
        if (seenData.has(docRef.data)) {
          continue;
        }
        seenData.add(docRef.data);
        result.push(docRef);
      }
      return result.sort((a, b) => {
        for (const { fieldName, asc } of sort) {
          const aVal = a.data[fieldName];
          const bVal = b.data[fieldName];
          if (aVal < bVal) {
            return asc ? -1 : 1;
          }
          if (aVal > bVal) {
            return asc ? 1 : -1;
          }
        }
        return 0;
      });
    }),
  );
}
