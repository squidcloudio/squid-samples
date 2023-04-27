import { Component } from '@angular/core';
import { DialogRef } from '@angular/cdk/dialog';
import { ThemeService } from '../services/theme.service';
import { CalendarService } from '../services/calendar.service';
import { TaskService } from '../services/task.service';
import { Observable } from 'rxjs';
import { FormatTypes, Task } from '../interfaces';
import * as dayjs from 'dayjs';

@Component({
  selector: 'app-calendar-window',
  templateUrl: 'calendar-modal-window.component.html',
  styleUrls: ['calendar-modal-window.component.scss'],
})
export class CalendarModalWindowComponent {
  expiredTasksObs: Observable<Task[]> = this.taskService.observeExpiredTasks();
  tomorrowTasksObs: Observable<Task[]> = this.taskService.observeTasksSortedByDate(
    dayjs().add(1, 'day').format(FormatTypes.DEFAULT_FORMAT),
  );
  constructor(
    readonly dialogRef: DialogRef<string>,
    readonly themeService: ThemeService,
    readonly calendarService: CalendarService,
    readonly taskService: TaskService,
  ) {}
}
