import { Component } from '@angular/core';
import { Squid } from '@squidcloud/client';

type User = { id: string; email: string; age: number };

@Component({
  selector: 'read-users',
  template: `
    <tr>
      <th>Email</th>
      <th>Age</th>
    </tr>
    <tr *ngFor="let user of users | async">
      <td>
        {{ user.email }}
      </td>
      <td>
        {{ user.age }}
      </td>
      <options [id]="user.id" />
    </tr>
  `,
})
export class ReadUsersComponent {
  constructor(private readonly squid: Squid) {}

  /* Sets the users variable to an observable of the 'users' collection
   * and subscribes to updates */
  users = this.squid.collection<User>('users').query().dereference().snapshots();
}
