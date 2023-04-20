import { Injectable } from '@angular/core';
import { ListService } from './list.service';
import { Squid } from '@squidcloud/client';
import { Task } from '../interfaces';
import { map, NEVER, Observable, switchMap } from 'rxjs';
import { AccountService } from './account.service';
import * as dayjs from 'dayjs';

@Injectable({ providedIn: 'root' })
export class TaskService {
  readonly taskCollection = this.squid.collection<Task>('tasks');

  constructor(
    private listService: ListService,
    private readonly squid: Squid,
    private accountService: AccountService,
  ) {}

  addNewTask(item: Task): void {
    this.taskCollection.doc(item.id).insert(item).then();
  }

  async changeTaskStatus(id: string): Promise<void> {
    const currentItem = await this.taskCollection.doc(id).snapshot();
    await this.taskCollection.doc(id).update({ completed: !currentItem?.data.completed });
  }

  observeTaskList(todoId: string): Observable<Task[]> {
    const today = dayjs().format('M/D/YYYY');
    const tomorrow = dayjs().add(1, 'day').format('M/D/YYYY');
    return this.accountService.observeUser().pipe(
      switchMap(user => {
        if (!user) return NEVER;
        const query = this.taskCollection.query().eq('userId', user.id);

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
            return this.taskCollection
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

  observeTask(id: string): Observable<Task> {
    return this.taskCollection
      .query()
      .eq('id', id)
      .snapshots()
      .pipe(
        map(items => {
          return items.map(item => item.data)[0];
        }),
      );
  }

  async changeTask(id: string, task: Task): Promise<void> {
    await this.taskCollection
      .doc(id)
      .update({ title: task.title, description: task.description, dueDate: task.dueDate, tags: task.tags });
  }

  observeTasksSortedByDate(date: string): Observable<Task[] | []> {
    return this.accountService.observeUser().pipe(
      switchMap(user => {
        if (!user) return NEVER;
        return this.taskCollection
          .query()
          .eq('userId', user.id)
          .eq('dueDate', date)
          .snapshots()
          .pipe(map(items => items.map(item => item.data)));
      }),
    );
  }

  deleteTask(id: string): void {
    if (id) this.taskCollection.doc(id).delete().then();
  }

  observeTasks(): Observable<Task[]> {
    return this.accountService.observeUser().pipe(
      switchMap(user => {
        if (!user) return NEVER;
        return this.taskCollection
          .query()
          .eq('userId', user.id)
          .snapshots()
          .pipe(map(items => items.map(item => item.data)));
      }),
    );
  }

  async deleteTasksFromList(id: string): Promise<void> {
    const itemList = await this.taskCollection.query().eq('todoId', id).snapshot();
    for (const item of itemList) {
      await this.taskCollection.doc(item.data.id).delete();
    }
  }
}
