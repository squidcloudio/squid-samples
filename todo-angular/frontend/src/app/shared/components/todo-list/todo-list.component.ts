import { Component, Input, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Todo } from '../../../interfaces';
import { TodosService } from '../../../services/todos.service';
import { ThemeService } from '../../../services/theme.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent implements OnInit {
  @Input('listType') listType!: string;
  todoList?: Observable<Todo[]>;

  amount: Observable<number> = of(0);

  constructor(private todoCollection: TodosService, readonly themeService: ThemeService) {}

  ngOnInit(): void {
    this.todoList =
      this.listType === 'defaultCollection'
        ? this.todoCollection.getDefaultCollection()
        : this.todoCollection.getUserCollection();
  }
}
