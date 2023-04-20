import { Injectable } from '@angular/core';
import { TodosService } from './todos.service';
import { Squid } from '@squidcloud/client';
import { Task } from '../interfaces';
import { map, NEVER, Observable, switchMap } from 'rxjs';
import { AccountService } from './account.service';
import * as dayjs from 'dayjs';

@Injectable({ providedIn: 'root' })
export class ItemsService {
  readonly itemCollection = this.squid.collection<Task>('tasks');

  constructor(
    private todoService: TodosService,
    private readonly squid: Squid,
    private accountService: AccountService,
  ) {}

  addNewItem(item: Task): void {
    this.itemCollection.doc(item.id).insert(item).then();
  }

  async changeItemStatus(id: string): Promise<void> {
    const currentItem = await this.itemCollection.doc(id).snapshot();
    await this.itemCollection.doc(id).update({ completed: !currentItem?.data.completed });
  }

  observeTodoItems(todoId: string): Observable<Task[]> {
    const today = dayjs().format('M/D/YYYY');
    const tomorrow = dayjs().add(1, 'day').format('M/D/YYYY');
    return this.accountService.observeUser().pipe(
      switchMap(user => {
        if (!user) return NEVER;
        const query = this.itemCollection.query().eq('userId', user.id);

        switch (todoId) {
          case 'today':
            query.eq('dueDate', today);
            break;
          case 'tomorrow':
            query.eq('dueDate', tomorrow);
            break;
          case 'someday':
            query.nin('dueDate', [today, tomorrow]);
            break;
          default:
            return this.itemCollection
              .query()
              .eq('todoId', todoId)
              .eq('userId', user.id)
              .snapshots()
              .pipe(map(items => items.map(item => item.data)));
        }
        return query.snapshots().pipe(map(items => items.map(item => item.data)));
      }),
    );
  }

  observeItem(id: string): Observable<Task> {
    return this.itemCollection
      .query()
      .eq('id', id)
      .snapshots()
      .pipe(
        map(items => {
          return items.map(item => item.data)[0];
        }),
      );
  }

  async changeItem(id: string, item: Task): Promise<void> {
    await this.itemCollection
      .doc(id)
      .update({ title: item.title, description: item.description, dueDate: item.dueDate, tags: item.tags });
  }

  observeItemsSortedByDate(date: string): Observable<Task[] | []> {
    return this.accountService.observeUser().pipe(
      switchMap(user => {
        if (!user) return NEVER;
        return this.itemCollection
          .query()
          .eq('userId', user.id)
          .eq('dueDate', date)
          .snapshots()
          .pipe(map(items => items.map(item => item.data)));
      }),
    );
  }

  deleteItem(id: string): void {
    if (id) this.itemCollection.doc(id).delete().then();
  }

  observeItems(): Observable<Task[]> {
    return this.accountService.observeUser().pipe(
      switchMap(user => {
        if (!user) return NEVER;
        return this.itemCollection
          .query()
          .eq('userId', user.id)
          .snapshots()
          .pipe(map(items => items.map(item => item.data)));
      }),
    );
  }

  async deleteItemsFromTodo(id: string): Promise<void> {
    const itemList = await this.itemCollection.query().eq('todoId', id).snapshot();
    for (const item of itemList) {
      await this.itemCollection.doc(item.data.id).delete();
    }
  }
}
