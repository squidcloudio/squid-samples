import { Component, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'options-dialog',
  template: `
    <div>
      <h2>Dialog</h2>
      <div>{{ data.id }}</div>
      <update-user [id]="data.id" />
      <delete-user [id]="data.id" />
      <button (click)="onExitClick()">X</button>
    </div>
  `,
  styleUrls: ['./options-dialog.component.scss'],
})
export class OptionsDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<OptionsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: string },
  ) {}

  onExitClick(): void {
    this.dialogRef.close();
  }
}
