import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { List } from '../../interfaces';
import { ListService } from '../../services/list.service';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent implements OnInit {
  @Input('listType') listType!: string;
  todoList?: Observable<List[]>;

  constructor(private listService: ListService, readonly themeService: ThemeService) {}

  ngOnInit(): void {
    this.todoList =
      this.listType === 'defaultCollection'
        ? this.listService.observeDefaultCollection()
        : this.listService.observeUserCollection();
  }
}
