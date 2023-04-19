import { Component, Input } from '@angular/core';
import { ModalListNames } from '../../interfaces';
import { Dialog } from '@angular/cdk/dialog';
import { ModalWindowComponent } from '../../shared/modal-window/modal-window.component';

@Component({
  selector: 'app-add-item-button',
  templateUrl: 'add-item-button.component.html',
  styleUrls: ['add-item-button.component.scss'],
})
export class AddItemButtonComponent {
  @Input('date') date?: string;
  readonly modalListName = ModalListNames;
  constructor(private dialog: Dialog) {}
  openModalWindow(): void {
    const dialogRef = this.dialog.open(ModalWindowComponent, {
      data: { name: this.modalListName.newItem, date: this.date },
    });
    dialogRef.closed.subscribe();
  }
}
