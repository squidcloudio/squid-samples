import { Component, OnDestroy, OnInit } from '@angular/core';
import { ListService } from '../../services/list.service';
import { filter, map, Observable, Subscription } from 'rxjs';
import { List, Task } from '../../interfaces';
import { ActivatedRoute, Params } from '@angular/router';
import { TaskService } from '../../services/task.service';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-list',
  templateUrl: './list-tasks.component.html',
  styleUrls: ['list-tasks.component.scss'],
})
export class ListTasksComponent implements OnInit, OnDestroy {
  listObs: Observable<List> | undefined;
  activeTasksObs: Observable<Task[]> | undefined;
  completedTasksObs?: Observable<Task[]>;
  paramsSub: Subscription | undefined;
  queryParamsSub: Subscription | undefined;
  taskId = '';
  readonly paramsObs: Observable<Params> = this.activatedRoute.params;

  constructor(
    private listService: ListService,
    private activatedRoute: ActivatedRoute,
    private TaskService: TaskService,
    readonly themeService: ThemeService,
  ) {}

  ngOnInit(): void {
    this.queryParamsSub = this.activatedRoute.queryParams.pipe(filter(params => params['taskId'])).subscribe(params => {
      if (params) this.taskId = params['taskId'];
    });
    this.paramsSub = this.paramsObs.subscribe(params => {
      const currentlistId = params['id'];
      this.listObs = this.listService.observeList(currentlistId);
      this.activeTasksObs = this.TaskService.observeTaskList(currentlistId).pipe(
        map(tasks => tasks.filter(task => !task.completed)),
      );

      this.completedTasksObs = this.TaskService.observeTaskList(currentlistId).pipe(
        map(tasks => tasks.filter(task => task.completed)),
      );
    });
  }

  ngOnDestroy(): void {
    this.paramsSub?.unsubscribe();
    this.queryParamsSub?.unsubscribe();
  }

  setTaskId(id: string): void {
    this.taskId = id;
  }
}
