import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { OptionsDialogComponent } from '../options-dialog/options-dialog.component';

@Component({
  selector: 'options',
  template: `<button (click)="openDialog()">...</button>`,
  styleUrls: ['./options.component.scss'],
})
export class OptionsComponent {
  @Input() id = '';

  constructor(public dialog: MatDialog) {}

  openDialog(): void {
    let dialogRef = this.dialog.open(OptionsDialogComponent, {
      height: '200px',
      width: '300px',
      panelClass: 'my-dialog',
      data: { id: this.id },
    });
  }
}
