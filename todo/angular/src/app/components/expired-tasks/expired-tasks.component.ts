import { Component, Input, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { FormatTypes, Task } from '../../interfaces';
import { TaskService } from '../../services/task.service';
import { ThemeService } from '../../services/theme.service';
import * as dayjs from 'dayjs';
import { Router } from '@angular/router';
import { DialogRef } from '@angular/cdk/dialog';

@Component({
  selector: 'app-expired-tasks',
  templateUrl: './expired-tasks.component.html',
  styleUrls: ['expired-tasks.component.scss'],
})
export class ExpiredTasksComponent implements OnInit {
  @Input('dialog') dialog?: DialogRef<string>;
  expiredTasksObs?: Observable<Task[]>;
  constructor(private taskService: TaskService, readonly themeService: ThemeService, private router: Router) {}

  ngOnInit(): void {
    this.expiredTasksObs = this.taskService.observeTasks().pipe(
      map(tasks =>
        tasks.filter(item => {
          const isItemIsExpired = dayjs(item.dueDate, FormatTypes.ISO_FORMAT).startOf('day') < dayjs().startOf('day');
          return isItemIsExpired && !item.completed;
        }),
      ),
    );
  }

  gotToPage(id: string): void {
    this.router.navigate(['', 'someday'], { queryParams: { itemId: id } });
    this.dialog?.close();
  }
}
