import { Component, OnDestroy, OnInit } from '@angular/core';
import { TodosService } from '../../services/todos.service';
import { filter, map, Observable, Subscription } from 'rxjs';
import { Task, List } from '../../interfaces';
import { ActivatedRoute, Params } from '@angular/router';
import { ItemsService } from '../../services/items.service';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo-items.component.html',
  styleUrls: ['todo-items.component.scss'],
})
export class TodoItemsComponent implements OnInit, OnDestroy {
  todoObs: Observable<List> | undefined;
  activeItemsObs: Observable<Task[]> | undefined;
  completedItemsObs?: Observable<Task[]>;
  paramsSub: Subscription | undefined;
  queryParamsSub: Subscription | undefined;
  itemId = '';
  readonly paramsObs: Observable<Params> = this.activatedRoute.params;

  constructor(
    private todoService: TodosService,
    private activatedRoute: ActivatedRoute,
    private itemsService: ItemsService,
    readonly themeService: ThemeService,
  ) {}

  ngOnInit(): void {
    this.queryParamsSub = this.activatedRoute.queryParams.pipe(filter(params => params['itemId'])).subscribe(params => {
      if (params) this.itemId = params['itemId'];
    });
    this.paramsSub = this.paramsObs.subscribe(params => {
      const currentTodoId = params['id'];
      this.todoObs = this.todoService.observeTodo(currentTodoId);
      this.activeItemsObs = this.itemsService
        .observeTodoItems(currentTodoId)
        .pipe(map(items => items.filter(item => !item.completed)));

      this.completedItemsObs = this.itemsService
        .observeTodoItems(currentTodoId)
        .pipe(map(items => items.filter(item => item.completed)));
    });
  }

  ngOnDestroy(): void {
    this.paramsSub?.unsubscribe();
    this.queryParamsSub?.unsubscribe();
  }

  setItemId(id: string): void {
    this.itemId = id;
  }
}
