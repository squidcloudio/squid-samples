import { Injectable } from '@angular/core';
import { ListService } from './list.service';
import { Squid } from '@squidcloud/client';
import { FormatTypes, Task } from '../interfaces';
import { map, NEVER, Observable, switchMap } from 'rxjs';
import { AccountService } from './account.service';
import * as dayjs from 'dayjs';

@Injectable({ providedIn: 'root' })
export class TaskService {
  readonly taskCollection = this.squid.collection<Task>('tasks');
  readonly today = dayjs().format('M/D/YYYY');
  readonly tomorrow = dayjs().add(1, 'day').format('M/D/YYYY');
  readonly user = this.accountService.getUser();
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

  observeTaskList(listId: string): Observable<Task[]> {
    return this.accountService.observeUser().pipe(
      switchMap(user => {
        if (!user) return NEVER;
        const query = this.taskCollection.query().eq('userId', user.id);

        switch (listId) {
          case 'today':
            query.eq('dueDate', this.today);
            break;
          case 'tomorrow':
            query.eq('dueDate', this.tomorrow);
            break;
          case 'someday':
            query.nin('dueDate', [this.today, this.tomorrow]);
            break;
          default:
            return this.taskCollection
              .query()
              .eq('listId', listId)
              .eq('userId', user.id)
              .snapshots()
              .pipe(map(tasks => tasks.map(task => task.data)));
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
    await this.taskCollection.doc(id).update({
      title: task.title,
      description: task.description,
      dueDate: task.dueDate,
      tags: task.tags,
      listId: task.listId,
      listColor: task.listColor,
    });
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
    const itemList = await this.taskCollection.query().eq('listId', id).snapshot();
    for (const item of itemList) {
      await this.taskCollection.doc(item.data.id).delete();
    }
  }
  async markAllTasksAsComplete(listId: string): Promise<void> {
    const userInfo = await this.user;
    if (userInfo) {
      const query = this.taskCollection.query().eq('userId', userInfo.id);
      let tasksCollection: any[] = [];
      if (listId === 'today') tasksCollection = await query.eq('dueDate', this.today).snapshot();
      if (listId === 'tomorrow') tasksCollection = await query.eq('dueDate', this.tomorrow).snapshot();
      if (listId === 'someday') tasksCollection = await query.nin('dueDate', [this.today, this.tomorrow]).snapshot();
      if (listId !== 'today' && listId !== 'tomorrow' && listId !== 'someday')
        tasksCollection = tasksCollection = await this.taskCollection.query().eq('listId', listId).snapshot();

      for (const task of tasksCollection) {
        await this.taskCollection.doc(task.data.id).update({ completed: true });
      }
    }
  }
  async clearAllCompleteTasks(listId: string): Promise<void> {
    const user = await this.user;
    if (user) {
      const query = this.taskCollection.query().eq('userId', user.id).eq('completed', true);
      let tasksCollection: any[] = [];
      if (listId === 'today') tasksCollection = await query.eq('dueDate', this.today).snapshot();
      if (listId === 'tomorrow') tasksCollection = await query.eq('dueDate', this.tomorrow).snapshot();
      if (listId === 'someday') tasksCollection = await query.nin('dueDate', [this.today, this.tomorrow]).snapshot();
      if (listId !== 'today' && listId !== 'tomorrow' && listId !== 'someday')
        tasksCollection = tasksCollection = await this.taskCollection.query().eq('listId', listId).snapshot();

      for (const task of tasksCollection) {
        await this.taskCollection.doc(task.data.id).delete();
      }
    }
  }

  observeExpiredTasks(): Observable<Task[]> {
    return this.observeTasks().pipe(
      map(tasks =>
        tasks.filter(item => {
          const isItemIsExpired = dayjs(item.dueDate, FormatTypes.ISO_FORMAT).startOf('day') < dayjs().startOf('day');
          return isItemIsExpired && !item.completed;
        }),
      ),
    );
  }
}
