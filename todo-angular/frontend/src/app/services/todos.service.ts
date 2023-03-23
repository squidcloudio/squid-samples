import { Injectable } from '@angular/core';
import { Squid } from '@squidcloud/client';
import { Todo } from '../interfaces/types';
import { map, NEVER, Observable, switchMap } from 'rxjs';
import { AccountService } from './account.service';

@Injectable({ providedIn: 'root' })
export class TodosService {
  currentTodo?: Todo;

  constructor(private readonly squid: Squid, private accountService: AccountService) {}

  getCollection(id: string): Observable<Todo[]> {
    return this.squid
      .collection<Todo>('todos')
      .query()
      .where('id', '==', id)
      .snapshots()
      .pipe(map(todos => todos.map(todo => todo.data)));
  }

  getDefaultCollection(): Observable<Todo[]> {
    return this.squid
      .collection<Todo>('todos')
      .query()
      .where('title', 'in', ['Today', 'Tomorrow', 'Someday'])
      .snapshots()
      .pipe(map(todos => todos.map(todo => todo.data)));
  }

  getUserCollection(): Observable<Todo[]> {
    return this.accountService.observeUser().pipe(
      switchMap(user => {
        if (!user) return NEVER;
        return this.squid
          .collection<Todo>('todos')
          .query()
          .where('userId', '==', user.id)
          .snapshots()
          .pipe(map(todos => todos.map(todo => todo.data)));
      }),
    );
  }

  setCurrentTodo(todo: Todo): void {
    this.currentTodo = todo;
  }

  async createNewList(title: string, color: string): Promise<void> {
    const userId = await this.accountService.getUser();
    const listId = self.crypto.randomUUID();
    const newList: Todo = {
      id: listId,
      userId: userId?.id,
      title: title,
      color: color,
    };
    await this.squid.collection<Todo>('todos').doc(newList.id).insert(newList);
  }
}
