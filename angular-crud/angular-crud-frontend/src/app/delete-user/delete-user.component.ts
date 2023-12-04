import { Component, Input } from '@angular/core';
import { Squid } from '@squidcloud/client';

type User = { id: string; email: string; age: number };

@Component({
  selector: 'delete-user',
  template: `<div><button (click)="deleteUser()">Delete user</button></div>`,
  styleUrls: ['./delete-user.component.scss'],
})
export class DeleteUserComponent {
  constructor(private readonly squid: Squid) {}

  @Input() id = '';
  /* Accesses the 'users' collection and deletes the user with the specified inputId */
  async deleteUser(): Promise<void> {
    await this.squid.collection<User>('users').doc(this.id).delete();
  }
}
