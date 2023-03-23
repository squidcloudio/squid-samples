import { Component } from '@angular/core';
import { TodosService } from '../../services/todos.service';
import { map, Observable } from 'rxjs';
import { Item, Todo } from '../../interfaces/types';
import { ActivatedRoute } from '@angular/router';
import { ItemsService } from '../../services/items.service';
import { ModalWindowsService } from '../../services/modalWindows.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo-item.component.html',
  styleUrls: ['todo-item.component.scss'],
})
export class TodoItemComponent {
  todoObs: Observable<Todo> | undefined;
  itemsObs: Observable<Item[]> | undefined;

  constructor(
    private todoService: TodosService,
    private activatedRoute: ActivatedRoute,
    private itemsService: ItemsService,
    public modalWindowService: ModalWindowsService,
  ) {
    this.activatedRoute.params.subscribe(params => {
      const currentTodoId = params['id'];
      this.todoObs = this.todoService.getCollection(currentTodoId).pipe(map(todos => todos[0]));
      this.itemsObs = this.itemsService.getItemsFromCurrentTodo(currentTodoId);
    });
  }

  openModalWindow(): void {
    this.modalWindowService.openModal('newItem');
  }
}
