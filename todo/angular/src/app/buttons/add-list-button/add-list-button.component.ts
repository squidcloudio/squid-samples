import { Component } from '@angular/core';
import { Dialog } from '@angular/cdk/dialog';
import { ModalWindowComponent } from '../../modal-window/modal-window.component';
import { ModalListNames } from '../../interfaces';

@Component({
  selector: 'app-add-list-button',
  templateUrl: 'add-list-button.component.html',
  styleUrls: ['add-list-button.component.scss'],
})
export class AddListButtonComponent {
  constructor(private dialog: Dialog) {}
  createNewList(): void {
    const dialogRef = this.dialog.open(ModalWindowComponent, { data: { name: ModalListNames.newList } });
    dialogRef.closed.subscribe();
  }
}
