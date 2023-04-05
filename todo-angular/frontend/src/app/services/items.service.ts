import { Injectable } from '@angular/core';
import { TodosService } from './todos.service';
import { Squid } from '@squidcloud/client';
import { Item } from '../interfaces';
import { map, NEVER, Observable, switchMap } from 'rxjs';
import { AccountService } from './account.service';
import * as moment from 'moment';

@Injectable({ providedIn: 'root' })
export class ItemsService {
  readonly item = this.squid.collection<Item>('items');

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
    const today = moment().format('M/D/YYYY');
    const tomorrow = moment().add(1, 'day').format('M/D/YYYY');
    return this.accountService.observeUser().pipe(
      switchMap(user => {
        if (!user) return NEVER;
        const query = this.item.query().where('userId', '==', user.id);

        switch (todoId) {
          case 'today':
            query.where('dueDate', '==', today);
            break;
          case 'tomorrow':
            query.where('dueDate', '==', tomorrow);
            break;
          case 'someday':
            query.where('dueDate', 'not in', [today, tomorrow]);
            break;
          default:
            return this.item
              .query()
              .where('todoId', '==', todoId)
              .where('userId', '==', user.id)
              .snapshots()
              .pipe(
                map(items =>
                  items.map(item => {
                    return item.data;
                  }),
                ),
              );
        }
        return query.snapshots().pipe(map(items => items.map(item => item.data)));
      }),
    );
  }

  getItem(id: string): Observable<Item> {
    return this.item
      .query()
      .where('id', '==', id)
      .snapshots()
      .pipe(
        map(items => {
          return items.map(item => item.data)[0];
        }),
      );
  }
  async changeItem(id: string, item: Item): Promise<void> {
    await this.item
      .doc(id)
      .update({ title: item.title, description: item.description, dueDate: item.dueDate, tags: item.tags });
  }
  getItemByDate(date: string): Observable<Item[] | []> {
    return this.accountService.observeUser().pipe(
      switchMap(user => {
        if (!user) return NEVER;
        return this.item
          .query()
          .where('userId', '==', user.id)
          .where('dueDate', '==', date)
          .snapshots()
          .pipe(map(items => items.map(item => item.data)));
      }),
    );
  }
  deleteItem(id?: string): void {
    if (id) this.item.doc(id).delete();
  }
  getItems(): Observable<Item[]> {
    return this.accountService.observeUser().pipe(
      switchMap(user => {
        if (!user) return NEVER;
        return this.item
          .query()
          .where('userId', '==', user.id)
          .snapshots()
          .pipe(map(items => items.map(item => item.data)));
      }),
    );
  }
  async deleteItemsFromTodo(): Promise<void> {
    if (this.todoService.currentTodo?.id) {
      const itemList = await this.item.query().where('todoId', '==', this.todoService.currentTodo.id).snapshot();
      for (let item of itemList) {
        await this.item.doc(item.data.id).delete();
      }
    }
  }
}
