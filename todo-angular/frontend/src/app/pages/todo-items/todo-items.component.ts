import { Component } from '@angular/core';
import { TodosService } from '../../services/todos.service';
import { map, Observable, of, switchMap } from 'rxjs';
import { Item, Todo } from '../../interfaces/types';
import { ActivatedRoute } from '@angular/router';
import { ItemsService } from '../../services/items.service';
import { Dialog } from '@angular/cdk/dialog';
import { ModalWindowComponent } from '../../shared/modal-window/modal-window.component';
import { ModalListNames } from '../../interfaces/interfaces';

@Component({
  selector: 'app-todo',
  templateUrl: './todo-items.component.html',
  styleUrls: ['todo-items.component.scss'],
})
export class TodoItemsComponent {
  todoObs: Observable<Todo> | undefined;
  activeItemsObs: Observable<Item[]> | undefined;
  completedItemsObs?: Observable<Item[]>;

  constructor(
    private todoService: TodosService,
    private activatedRoute: ActivatedRoute,
    private itemsService: ItemsService,
    public dialog: Dialog,
  ) {
    this.activatedRoute.params.subscribe(params => {
      const currentTodoId = params['id'];
      this.todoObs = this.todoService.getCollection(currentTodoId).pipe(map(todos => todos[0]));
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

  openModalWindow(): void {
    const dialogRef = this.dialog.open(ModalWindowComponent, { data: { name: ModalListNames.newItem } });
    dialogRef.closed.subscribe();
  }
}
