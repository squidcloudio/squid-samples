import { Component } from '@angular/core';
import { Squid } from '@squidcloud/client';

type User = { id: string; email: string; age: number };

@Component({
  selector: 'read-users',
  template: ` <ul>
    <li *ngFor="let user of users | async">
      {{ user.email }} - {{ user.age }}
    </li>
  </ul>`,
})
export class ReadUsersComponent {
  constructor(private readonly squid: Squid) {}

  users = this.squid
    .collection<User>('users')
    .query()
    .dereference()
    .snapshots();
}
