import { Injectable } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { User } from '../interfaces/interfaces';
import { firstValueFrom, NEVER, Observable, of, switchMap } from 'rxjs';
import { Squid } from '@squidcloud/client';

@Injectable({ providedIn: 'root' })
export class AccountService {
  private readonly userObs: Observable<User | undefined> = this.authService.user$.pipe(
    switchMap(user => {
      if (user === undefined) return NEVER;
      if (!user) return of(undefined);
      return of({
        username: user.nickname!,
        email: user.email!,
        avatar: user.picture!,
        id: user.sub!,
      });
    }),
  );

  constructor(private readonly authService: AuthService, private readonly squid: Squid) {
    this.authService.idTokenClaims$.subscribe(idToken => {
      const rawIdToken = idToken?.__raw;
      this.squid.setAuthIdToken(rawIdToken);
    });
  }

  logout() {
    this.squid.setAuthIdToken(undefined);
    this.authService.logout();
  }

  observeUser(): Observable<User | undefined> {
    return this.userObs;
  }

  async getUser(): Promise<User | undefined> {
    return firstValueFrom(this.observeUser());
  }
}
