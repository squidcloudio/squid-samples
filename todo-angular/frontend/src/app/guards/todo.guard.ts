import { inject, Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateChild,
  CanActivateChildFn,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { filter, Observable, of, switchMap, tap } from 'rxjs';
import { TodosService } from '../services/todos.service';

@Injectable({ providedIn: 'root' })
export class ChildrenGuard implements CanActivateChild {
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }
}

export const canActivate: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const todosService = inject(TodosService);
  const router = inject(Router);
  const currentIdFromParam = route.params['id'];

  return todosService.todo(currentIdFromParam).pipe(
    tap(result => {
      if (!result || !currentIdFromParam) {
        router.navigate(['', 1]);
      }
    }),
    filter(result => !!result),
    switchMap(result => {
      todosService.setCurrentTodo(result);
      return of(true);
    }),
  );
};

export const canActivateChild: CanActivateChildFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) =>
  canActivate(route, state);
