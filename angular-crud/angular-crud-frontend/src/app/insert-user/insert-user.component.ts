import { Component } from '@angular/core';
import { Squid } from '@squidcloud/client';

// Define your type
type User = { id: string; email: string; age: number };

@Component({
  selector: 'insert-user',
  template: `
    <button id="insert" (click)="insertNewUser()">Create new user</button>
    <br />
  `,
  styleUrls: ['./insert-user.component.scss'],
})
export class InsertUserComponent {
  constructor(private readonly squid: Squid) {}

  /* Inserts new user data into the 'users' collection */
  async insertNewUser(): Promise<void> {
    const userId = crypto.randomUUID();
    const email = `${userId}@gmail.com`;

    await this.squid
      .collection<User>('users')
      .doc(userId)
      .insert({
        id: userId,
        email,
        age: Math.ceil(Math.random() * 100),
      });
  }
}
