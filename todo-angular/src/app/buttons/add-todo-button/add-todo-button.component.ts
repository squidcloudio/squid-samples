import { Component } from '@angular/core';
import { Dialog } from '@angular/cdk/dialog';
import { ModalWindowComponent } from '../../shared/modal-window/modal-window.component';
import { ModalListNames } from '../../interfaces';

@Component({
  selector: 'app-add-todo-button',
  templateUrl: 'add-todo-button.component.html',
  styleUrls: ['add-todo-button.component.scss'],
})
export class AddTodoButtonComponent {
  constructor(private dialog: Dialog) {}
  createNewList(): void {
    const dialogRef = this.dialog.open(ModalWindowComponent, { data: { name: ModalListNames.newList } });
    dialogRef.closed.subscribe();
  }
}
