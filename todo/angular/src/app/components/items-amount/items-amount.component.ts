import { Component, Input, OnInit } from '@angular/core';
import { List } from '../../interfaces';
import { TaskService } from '../../services/tasks.service';
import { map, Observable, of } from 'rxjs';

@Component({
  selector: 'app-items-amount',
  templateUrl: 'items-amount.component.html',
  styleUrls: ['items-amount.component.scss'],
})
export class ItemsAmountComponent implements OnInit {
  @Input('todo') todo?: List;
  amount: Observable<number> = of(0);

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    if (!this.todo) return;
    this.amount = this.taskService.observeTaskList(this.todo.id).pipe(
      map(items => items.filter(item => !item.completed)),
      map(items => items.length),
    );
  }
}
