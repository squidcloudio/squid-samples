import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo } from '../../interfaces/types';
import { TodosService } from '../../services/todos.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent implements OnInit {
  @Input('listType') listType!: string;
  todoList?: Observable<Todo[]>;

  amount = 0;

  constructor(private todoCollection: TodosService) {}

  ngOnInit(): void {
    this.todoList =
      this.listType === 'defaultCollection'
        ? this.todoCollection.getDefaultCollection()
        : this.todoCollection.getUserCollection();
  }
}
