import { Injectable } from '@angular/core';
import { TodosService } from './todos.service';
import { Squid } from '@squidcloud/client';
import { Item } from '../interfaces/types';
import { map, NEVER, Observable, switchMap } from 'rxjs';
import { AccountService } from './account.service';

@Injectable({ providedIn: 'root' })
export class ItemsService {
  item = this.squid.collection<Item>('items');

  constructor(
    private todoService: TodosService,
    private readonly squid: Squid,
    private accountService: AccountService,
  ) {}

  addNewItem(item: Item): void {
    this.item.doc(item.id).insert(item);
  }

  async changeItemStatus(id: string): Promise<void> {
    const currentItem = await this.item.doc(id).snapshot();
    await this.item.doc(id).update({ completed: !currentItem?.data.completed });
  }

  getItemsFromCurrentTodo(todoId: string): Observable<Item[]> {
    const local = 'en-Us';
    const options: any = {
      month: 'numeric',
      day: 'numeric',
      year: 'numeric',
    };
    const nextDate = new Date().setDate(new Date().getDate() + 1);
    const today = new Date().toLocaleDateString(local, options);
    const tomorrow = new Date(nextDate).toLocaleDateString(local, options);
    return this.accountService.observeUser().pipe(
      switchMap(user => {
        if (!user) return NEVER;
        switch (todoId) {
          case '1':
            return this.item
              .query()
              .where('userId', '==', user?.id)
              .where('dueDate', '==', today)
              .snapshots()
              .pipe(map(items => items.map(item => item.data)));
          case '2':
            return this.item
              .query()
              .where('userId', '==', user?.id)
              .where('dueDate', '==', tomorrow)
              .snapshots()
              .pipe(map(items => items.map(item => item.data)));
          case '3':
            return this.item
              .query()
              .where('userId', '==', user?.id)
              .where('dueDate', 'not in', [today, tomorrow])
              .snapshots()
              .pipe(map(items => items.map(item => item.data)));
          default:
            return this.item
              .query()
              .where('todoId', '==', todoId)
              .snapshots()
              .pipe(
                map(items =>
                  items.map(item => {
                    return item.data;
                  }),
                ),
              );
        }
      }),
    );
  }
}
