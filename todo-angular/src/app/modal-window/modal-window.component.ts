import { Component, Inject, Input } from '@angular/core';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { ModalWindowData } from '../interfaces';
import { ThemeService } from '../services/theme.service';

@Component({
  selector: 'app-modal-window',
  templateUrl: './modal-window.component.html',
  styleUrls: ['./modal-window.component.scss'],
})
export class ModalWindowComponent {
  @Input('modalName') modalName?: string;

  constructor(
    readonly dialogRef: DialogRef<string>,
    @Inject(DIALOG_DATA) readonly data: ModalWindowData,
    readonly themeService: ThemeService,
  ) {}
}
