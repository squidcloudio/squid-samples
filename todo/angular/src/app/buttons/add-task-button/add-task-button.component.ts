import { Component, Input } from '@angular/core';
import { ModalListNames } from '../../interfaces';
import { Dialog } from '@angular/cdk/dialog';
import { ModalWindowComponent } from '../../modal-window/modal-window.component';

@Component({
  selector: 'app-add-task-button',
  templateUrl: 'add-task-button.component.html',
  styleUrls: ['add-task-button.component.scss'],
})
export class AddTaskButtonComponent {
  @Input('date') date?: string;
  @Input('type') type?:string;
  readonly modalListName = ModalListNames;
  constructor(private dialog: Dialog) {}
  openModalWindow(): void {
    const dialogRef = this.dialog.open(ModalWindowComponent, {
      data: { name: this.modalListName.newTask, date: this.date },
    });
    dialogRef.closed.subscribe();
  }
}
