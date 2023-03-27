import { Component } from '@angular/core';
import { TodosService } from '../../services/todos.service';

@Component({
  selector: 'app-edit-todo',
  templateUrl: './edit-todo.component.html',
  styleUrls: ['./edit-todo.component.scss'],
})
export class EditTodoComponent {
  constructor(private todoService: TodosService) {}

  deleteTodo(): void {
    this.todoService.deleteTodo();
  }
}
