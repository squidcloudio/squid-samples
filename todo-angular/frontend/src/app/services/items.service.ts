import { Injectable } from '@angular/core';
import { TodosService } from './todos.service';
import { Squid } from '@squidcloud/client';
import { Item } from '../interfaces/types';
import { map, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ItemsService {
  constructor(private todoService: TodosService, private readonly squid: Squid) {}

  getItemsFromCurrentTodo(todoId: string): Observable<Item[]> {
    return this.squid
      .collection<Item>('items')
      .query()
      .where('todoId', '==', todoId)
      .snapshots()
      .pipe(
        map(items =>
          items.map(item => {
            console.log(item.data);
            return item.data;
          }),
        ),
      );
  }
}
