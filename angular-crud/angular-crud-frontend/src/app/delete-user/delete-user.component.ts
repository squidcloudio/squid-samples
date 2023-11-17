import { Component } from '@angular/core';
import { Squid } from '@squidcloud/client';

type User = { id: string; email: string; age: number };

@Component({
  selector: 'delete-user',
  template: `
    <form style="margin: 10px" name="form" (ngSubmit)="deleteUser()">
      <div>
        <label style="padding-right: 9px" for="input-id">ID: </label>
        <input id="input-id" name="input-id" [(ngModel)]="inputId" />
      </div>
      <button style="margin-top: 4px">Delete</button>
    </form>
  `,
})
export class DeleteUserComponent {
  constructor(private readonly squid: Squid) {
    this.inputId = '';
  }

  inputId: string;

  async deleteUser(): Promise<void> {
    await this.squid.collection<User>('users').doc(this.inputId).delete();
  }
}
