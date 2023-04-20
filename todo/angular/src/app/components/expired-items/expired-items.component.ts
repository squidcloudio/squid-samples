import { Component, Input, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { FormatTypes, Task } from '../../interfaces';
import { TaskService } from '../../services/tasks.service';
import { ThemeService } from '../../services/theme.service';
import * as dayjs from 'dayjs';
import { Router } from '@angular/router';
import { DialogRef } from '@angular/cdk/dialog';

@Component({
  selector: 'app-expired-items',
  templateUrl: 'expired-items.component.html',
  styleUrls: ['expired-items.component.scss'],
})
export class ExpiredItemsComponent implements OnInit {
  @Input('dialog') dialog?: DialogRef<string>;
  expiredItemsObs?: Observable<Task[]>;
  constructor(private taskService: TaskService, readonly themeService: ThemeService, private router: Router) {}

  ngOnInit(): void {
    this.expiredItemsObs = this.taskService.observeTasks().pipe(
      map(items =>
        items.filter(item => {
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
