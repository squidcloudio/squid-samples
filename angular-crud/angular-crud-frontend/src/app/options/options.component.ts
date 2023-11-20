import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { OptionsDialogComponent } from '../options-dialog/options-dialog.component';


@Component({
  selector: 'options',
  template: `<button (click)='openDialog()'>...</button>`
})
export class OptionsComponent {
  @Input() id = '';

  constructor(public dialog: MatDialog) {}

  openDialog(): void {
    let dialogRef = this.dialog.open(OptionsDialogComponent, {
      width: '250px',
      data: { id: this.id }
    });
  }
}
