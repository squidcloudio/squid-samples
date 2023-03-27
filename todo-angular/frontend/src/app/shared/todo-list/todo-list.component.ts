import { Component, Input, OnInit } from '@angular/core';
import { Observable, of, switchMap } from 'rxjs';
import { Todo } from '../../interfaces/types';
import { TodosService } from '../../services/todos.service';
import { ItemsService } from '../../services/items.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent implements OnInit {
  @Input('listType') listType!: string;
  todoList?: Observable<Todo[]>;

  amount: Observable<number> = of(0);

  constructor(private todoCollection: TodosService, private itemService: ItemsService) {}

  ngOnInit(): void {
    this.todoList =
      this.listType === 'defaultCollection'
        ? this.todoCollection.getDefaultCollection()
        : this.todoCollection.getUserCollection();
  }
}
