import { Component, Input, OnInit } from '@angular/core';
import { Todo } from '../../interfaces/types';
import { ItemsService } from '../../services/items.service';
import { map, Observable, of } from 'rxjs';

@Component({
  selector: 'app-items-amount',
  templateUrl: 'items-amount.component.html',
  styleUrls: ['items-amount.component.scss'],
})
export class ItemsAmountComponent implements OnInit {
  @Input('todo') todo?: Todo;
  amount: Observable<number> = of(0);

  constructor(private itemService: ItemsService) {}

  ngOnInit(): void {
    if (!this.todo) return;
    this.amount = this.itemService.getItemsFromCurrentTodo(this.todo.id).pipe(map(items => items.length));
  }
}
