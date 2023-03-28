import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateChildFn,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { filter, of, switchMap, tap } from 'rxjs';
import { TodosService } from '../services/todos.service';

export const canActivate: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const todosService = inject(TodosService);
  const router = inject(Router);
  const currentIdFromParam = route.params['id'];

  return todosService.listTodos(currentIdFromParam).pipe(
    tap(result => {
      if (!result || !currentIdFromParam) {
        router.navigate(['', 1]);
      }
    }),
    filter(result => !!result),
    switchMap(result => {
      todosService.setCurrentTodo(result[0]);
      return of(true);
    }),
  );
};

export const canActivateChild: CanActivateChildFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) =>
  canActivate(route, state);
