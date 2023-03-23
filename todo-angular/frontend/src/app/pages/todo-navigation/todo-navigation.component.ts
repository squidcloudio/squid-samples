import { Component } from '@angular/core';
import { TodosService } from '../../services/todos.service';
import { Todo } from '../../interfaces/types';
import { Observable } from 'rxjs';
import { ModalWindowsService } from '../../services/modalWindows.service';
import { ModalListNames } from '../../interfaces/interfaces';

@Component({
  selector: 'app-todo-navigation',
  templateUrl: './todo-navigation.component.html',
  styleUrls: ['./todo-navigation.component.scss'],
})
export class TodoNavigationComponent {
  todoList?: Observable<Todo[]>;

  constructor(private todoCollection: TodosService, public modalWindowService: ModalWindowsService) {
    this.todoList = this.todoCollection.getDefaultCollection();
  }

  createNewList(): void {
    this.modalWindowService.openModal(ModalListNames.newList);
  }
}
