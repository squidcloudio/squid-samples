import { Component, OnDestroy, OnInit } from '@angular/core';
import { TodosService } from '../../services/todos.service';
import { map, Observable, of, Subscription, switchMap } from 'rxjs';
import { Item, Todo } from '../../interfaces';
import { ActivatedRoute, Params } from '@angular/router';
import { ItemsService } from '../../services/items.service';
import { Dialog } from '@angular/cdk/dialog';
import { ModalWindowComponent } from '../../shared/modal-window/modal-window.component';
import { ModalListNames } from '../../interfaces';

@Component({
  selector: 'app-todo',
  templateUrl: './todo-items.component.html',
  styleUrls: ['todo-items.component.scss'],
})
export class TodoItemsComponent implements OnInit, OnDestroy {
  todoObs: Observable<Todo> | undefined;
  activeItemsObs: Observable<Item[]> | undefined;
  completedItemsObs?: Observable<Item[]>;
  paramsSub: Subscription | undefined;
  itemId = '';
  readonly modalListName = ModalListNames;
  readonly paramsObs: Observable<Params> = this.activatedRoute.params;

  constructor(
    private todoService: TodosService,
    private activatedRoute: ActivatedRoute,
    private itemsService: ItemsService,
    private dialog: Dialog,
  ) {}
  ngOnInit(): void {
    this.paramsSub = this.paramsObs.subscribe(params => {
      const currentTodoId = params['id'];
      this.todoObs = this.todoService.todo(currentTodoId).pipe(map(todos => todos));
      this.activeItemsObs = this.itemsService
        .getItemsFromCurrentTodo(currentTodoId)
        .pipe(map(items => items.filter(item => !item.completed)));

      this.completedItemsObs = this.itemsService.getItemsFromCurrentTodo(currentTodoId).pipe(
        map(items => items.filter(item => item.completed)),
        switchMap(items => {
          return of(items);
        }),
      );
    });
  }

  openModalWindow(windowName: string): void {
    const dialogRef = this.dialog.open(ModalWindowComponent, { data: { name: windowName } });
    dialogRef.closed.subscribe();
  }
  ngOnDestroy(): void {
    this.paramsSub?.unsubscribe();
  }
  setItemId(id: string): void {
    this.itemId = id;
  }
}
