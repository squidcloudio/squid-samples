import { Component, Input, OnInit } from '@angular/core';
import { List } from '../../interfaces';
import { TaskService } from '../../services/task.service';
import { map, Observable, of } from 'rxjs';

@Component({
  selector: 'app-tasks-amount',
  templateUrl: 'tasks-amount.component.html',
  styleUrls: ['tasks-amount.component.scss'],
})
export class TasksAmountComponent implements OnInit {
  @Input('list') list?: List;
  amount: Observable<number> = of(0);

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    if (!this.list) return;
    this.amount = this.taskService.observeTaskList(this.list.id).pipe(
      map(tasks => tasks.filter(task => !task.completed)),
      map(tasks => tasks.length),
    );
  }
}
