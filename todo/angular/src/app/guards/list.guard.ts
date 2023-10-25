import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { NEVER, Observable, of, switchMap } from 'rxjs';
import { ListService } from '../services/list.service';
import { AccountService } from '../services/account.service';

@Injectable({ providedIn: 'root' })
export class ChildrenGuard implements CanActivateChild {
  constructor(
    private listService: ListService,
    private router: Router,
    private accountService: AccountService,
  ) {}
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const currentIdFromParam = childRoute.params['id'];
    if (!childRoute.params.hasOwnProperty('id')) return this.router.createUrlTree(['', 'today']);
    return this.accountService.observeUser().pipe(
      switchMap(user => {
        if (!user) {
          this.accountService.login();
          return NEVER;
        }
        return this.listService.observeList(currentIdFromParam).pipe(
          switchMap(result => {
            if (!result) {
              const currentUrl = this.router.createUrlTree(['', 'today']);
              return of(currentUrl);
            }

            this.listService.setCurrentList(result);
            return of(true);
          }),
        );
      }),
    );
  }
}
