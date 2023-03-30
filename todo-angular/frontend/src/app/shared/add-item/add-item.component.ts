import { Component } from '@angular/core';
import { ModalListNames } from '../../interfaces';
import { Dialog } from '@angular/cdk/dialog';
import { ModalWindowComponent } from '../modal-window/modal-window.component';

@Component({
  selector: 'app-add-item',
  templateUrl: 'add-item.component.html',
  styleUrls: ['add-item.component.scss'],
})
export class AddItemComponent {
  readonly modalListName = ModalListNames;
  constructor(private dialog: Dialog) {}
  openModalWindow(): void {
    const dialogRef = this.dialog.open(ModalWindowComponent, { data: { name: this.modalListName.newItem } });
    dialogRef.closed.subscribe();
  }
}
