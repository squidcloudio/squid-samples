import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of, switchMap } from 'rxjs';
import { TodosService } from '../services/todos.service';

@Injectable({ providedIn: 'root' })
export class ChildrenGuard implements CanActivateChild {
  constructor(private todoService: TodosService, private router: Router) {}
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const currentIdFromParam = childRoute.params['id'];
    if (!childRoute.params.hasOwnProperty('id')) return this.router.createUrlTree(['', 1]);
    return this.todoService.todo(currentIdFromParam).pipe(
      switchMap(result => {
        if (!currentIdFromParam || !result) {
          const currentUrl = this.router.createUrlTree(['', 1]);
          return of(currentUrl);
        }

        this.todoService.setCurrentTodo(result);
        return of(true);
      }),
    );
  }
}
