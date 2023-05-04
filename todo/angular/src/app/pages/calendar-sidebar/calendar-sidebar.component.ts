import { Component, Input } from '@angular/core';
import { ThemeService } from '../../services/theme.service';
import { TaskService } from '../../services/task.service';
import { Observable } from 'rxjs';
import { FormatTypes, Task } from '../../interfaces';
import * as dayjs from 'dayjs';

@Component({
  selector: 'app-calendar-sidebar',
  templateUrl: './calendar-sidebar.component.html',
  styleUrls: ['./calendar-sidebar.component.scss'],
})
export class CalendarSidebarComponent {
  @Input('currentListId') currentListId?: string;
  expiredTasksObs: Observable<Task[]> = this.taskService.observeExpiredTasks();
  tomorrowTasksObs: Observable<Task[]> = this.taskService.observeTasksSortedByDate(
    dayjs().add(1, 'day').format(FormatTypes.DEFAULT_FORMAT),
  );

  constructor(readonly themeService: ThemeService, readonly taskService: TaskService) {}
}
