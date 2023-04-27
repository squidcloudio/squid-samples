import { Component, Input, OnInit } from '@angular/core';
import { FormatTypes, Task } from '../../interfaces';
import * as dayjs from 'dayjs';
import { Router } from '@angular/router';
import { CalendarService } from '../../services/calendar.service';
import { Observable } from 'rxjs';
import { ThemeService } from '../../services/theme.service';
import { DialogRef } from '@angular/cdk/dialog';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-calendar-tasks',
  templateUrl: 'calendar-tasks.component.html',
  styleUrls: ['calendar-tasks.component.scss'],
})
export class CalendarTasksComponent implements OnInit {
  @Input('dialog') dialog?: DialogRef<string>;
  @Input('duringType') duringType?: string;
  activeTasksObs?: Observable<Task[]>;
  readonly formatTypes = FormatTypes;
  constructor(
    private router: Router,
    readonly calendarService: CalendarService,
    readonly themeService: ThemeService,
    private taskService: TaskService,
  ) {}

  ngOnInit(): void {
    this.activeTasksObs = this.duringType
      ? this.taskService.observeTasksSortedByDate(dayjs().add(1, 'day').format(FormatTypes.DEFAULT_FORMAT))
      : this.calendarService.observeTasksOnDate();
  }

  async goToTodoPage(listId: string, taskId: string, dueDate?: string): Promise<void> {
    await this.router.navigate(['', listId], { queryParams: { taskId: taskId } });
    this.dialog?.close();
  }
}
