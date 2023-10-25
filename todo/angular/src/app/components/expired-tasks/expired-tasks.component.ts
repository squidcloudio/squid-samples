import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../../interfaces';
import { TaskService } from '../../services/task.service';
import { ThemeService } from '../../services/theme.service';
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
  constructor(
    private taskService: TaskService,
    readonly themeService: ThemeService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.expiredTasksObs = this.taskService.observeExpiredTasks();
  }

  gotToPage(task: Task): void {
    this.router.navigate(['', task.listId], { queryParams: { taskId: task.id } });
    this.dialog?.close();
  }
}
