import { Injectable } from '@angular/core';
import { Squid } from '@squidcloud/client';
import { Todo } from '../interfaces';
import { map, NEVER, Observable, switchMap } from 'rxjs';
import { AccountService } from './account.service';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class TodosService {
  currentTodo?: Todo;
  readonly todoCollection;

  constructor(private readonly squid: Squid, private accountService: AccountService, private router: Router) {
    this.todoCollection = this.squid.collection<Todo>('todos');
  }

  observeTodo(id: string): Observable<Todo> {
    return this.todoCollection
      .query()
      .eq('id', id)
      .snapshots()
      .pipe(map(todos => todos.map(todo => todo.data)[0]));
  }

  observeDefaultCollection(): Observable<Todo[]> {
    return this.todoCollection
      .query()
      .in('title', ['Today', 'Tomorrow', 'Someday'])
      .sortBy('userId')
      .snapshots()
      .pipe(map(todos => todos.map(todo => todo.data)));
  }

  observeUserCollection(): Observable<Todo[]> {
    return this.accountService.observeUser().pipe(
      switchMap(user => {
        if (!user) return NEVER;
        return this.todoCollection
          .query()
          .eq('userId', user.id)
          .sortBy('id')
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
    await this.todoCollection.doc(newList.id).insert(newList);
  }

  deleteTodo(id: string): void {
    this.todoCollection.doc(id).delete();
    this.router.navigate(['', 'today']).then();
  }

  changeTodo(id: string, newTitle: string): void {
    this.todoCollection.doc(id).update({ title: newTitle });
  }
}
