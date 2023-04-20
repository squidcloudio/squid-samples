import { Component, Input, OnInit } from '@angular/core';
import { FormatTypes, Task } from '../../interfaces';
import * as dayjs from 'dayjs';
import { Router } from '@angular/router';
import { CalendarService } from '../../services/calendar.service';
import { Observable } from 'rxjs';
import { ThemeService } from '../../services/theme.service';
import { DialogRef } from '@angular/cdk/dialog';

@Component({
  selector: 'app-calendar-tasks',
  templateUrl: 'calendar-tasks.component.html',
  styleUrls: ['calendar-tasks.component.scss'],
})
export class CalendarTasksComponent implements OnInit {
  @Input('dialog') dialog?: DialogRef<string>;
  activeTasksObs?: Observable<Task[]>;
  readonly formatTypes = FormatTypes;
  constructor(private router: Router, readonly calendarService: CalendarService, readonly themeService: ThemeService) {}

  ngOnInit(): void {
    this.activeTasksObs = this.calendarService.observeTasksOnDate();
  }

  async goToTodoPage(todoId: string, taskId: string, dueDate?: string): Promise<void> {
    const today = dayjs().format(FormatTypes.DEFAULT_FORMAT);
    const tomorrow = dayjs().add(1, 'day').format(FormatTypes.DEFAULT_FORMAT);
    const navigationId = dueDate === today ? 'today' : dueDate === tomorrow ? 'tomorrow' : 'someday';
    await this.router.navigate(['', todoId ? todoId : navigationId], { queryParams: { taskId: taskId } });
    this.dialog?.close();
  }
}
