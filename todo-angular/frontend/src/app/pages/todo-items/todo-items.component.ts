import { Component } from '@angular/core';
import { TodosService } from '../../services/todos.service';
import { map, Observable } from 'rxjs';
import { Item, Todo } from '../../interfaces/types';
import { ActivatedRoute } from '@angular/router';
import { ItemsService } from '../../services/items.service';
import { ModalWindowsService } from '../../services/modalWindows.service';
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
  itemsObs: Observable<Item[]> | undefined;

  constructor(
    private todoService: TodosService,
    private activatedRoute: ActivatedRoute,
    private itemsService: ItemsService,
    public dialog: Dialog,
  ) {
    this.activatedRoute.params.subscribe(params => {
      const currentTodoId = params['id'];
      this.todoObs = this.todoService.getCollection(currentTodoId).pipe(map(todos => todos[0]));
      this.itemsObs = this.itemsService.getItemsFromCurrentTodo(currentTodoId);
    });
  }

  openModalWindow(): void {
    const dialogRef = this.dialog.open(ModalWindowComponent, { data: { name: ModalListNames.newItem } });
    dialogRef.closed.subscribe();
  }
}
