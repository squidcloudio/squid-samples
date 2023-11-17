import { Component } from '@angular/core';
import { Squid } from '@squidcloud/client';

type User = { id: string; email: string; age: number };

@Component({
  selector: 'update-user',
  template: `
    <form style="margin: 10px" name="form" (ngSubmit)="updateUser()">
      <div>
        <label style="padding-right: 9px" for="input-id">ID: </label>
        <input id="input-id" name="input-id" [(ngModel)]="inputId" />
      </div>
      <div>
        <label for="input-age">Age: </label>
        <input
          id="input-age"
          name="input-age"
          type="number"
          [(ngModel)]="inputAge"
        />
      </div>
      <button style="margin-top: 4px">Update Age</button>
    </form>
  `,
})
export class UpdateUserComponent {
  constructor(private readonly squid: Squid) {
    this.inputId = '';
  }

  inputId: string;
  inputAge: number | undefined;

  async updateUser(): Promise<void> {
    if (this.inputAge) {
      await this.squid.collection<User>('users').doc(this.inputId).update({
        age: this.inputAge,
      });
    }
  }
}
