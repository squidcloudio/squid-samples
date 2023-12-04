import { Component, Input } from '@angular/core';
import { Squid } from '@squidcloud/client';

type User = { id: string; email: string; age: number };

@Component({
  selector: 'update-user',
  template: `
    <form name="form" (ngSubmit)="updateUser()">
      <input id="input-age" name="input-age" type="number" placeholder="Age" [(ngModel)]="inputAge" />
      <button>Update Age</button>
    </form>
  `,
  styleUrls: ['./update-user.component.scss'],
})
export class UpdateUserComponent {
  @Input() id = '';

  constructor(private readonly squid: Squid) {}

  inputAge: number | undefined;

  /* Accesses the user document with the specified inputId and updates their age */
  async updateUser(): Promise<void> {
    if (this.inputAge) {
      await this.squid.collection<User>('users').doc(this.id).update({
        age: this.inputAge,
      });
    }
  }
}
