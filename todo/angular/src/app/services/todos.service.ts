import { Injectable } from '@angular/core';
import { Squid } from '@squidcloud/client';
import { List } from '../interfaces';
import { map, NEVER, Observable, switchMap } from 'rxjs';
import { AccountService } from './account.service';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class TodosService {
  currentList?: List;
  readonly listCollection;

  constructor(private readonly squid: Squid, private accountService: AccountService, private router: Router) {
    this.listCollection = this.squid.collection<List>('lists');
  }

  observeTodo(id: string): Observable<List> {
    return this.listCollection
      .query()
      .eq('id', id)
      .snapshots()
      .pipe(map(todos => todos.map(todo => todo.data)[0]));
  }

  observeDefaultCollection(): Observable<List[]> {
    return this.listCollection
      .query()
      .in('title', ['Today', 'Tomorrow', 'Someday'])
      .sortBy('userId')
      .snapshots()
      .pipe(map(todos => todos.map(todo => todo.data)));
  }

  observeUserCollection(): Observable<List[]> {
    return this.accountService.observeUser().pipe(
      switchMap(user => {
        if (!user) return NEVER;
        return this.listCollection
          .query()
          .eq('userId', user.id)
          .sortBy('id')
          .snapshots()
          .pipe(map(todos => todos.map(todo => todo.data)));
      }),
    );
  }

  setCurrentList(list: List): void {
    this.currentList = list;
  }

  async createNewList(title: string, color: string): Promise<void> {
    const userId = await this.accountService.getUser();
    const listId = self.crypto.randomUUID();
    const newList: List = {
      id: listId,
      userId: userId?.id,
      title: title,
      color: color,
    };
    await this.listCollection.doc(newList.id).insert(newList);
  }

  deleteTodo(id: string): void {
    this.listCollection.doc(id).delete();
    this.router.navigate(['', 'today']).then();
  }

  changeTodo(id: string, newTitle: string): void {
    this.listCollection.doc(id).update({ title: newTitle });
  }
}
