import { Component, Inject, Input } from '@angular/core';
import { ModalWindowsService } from '../../services/modalWindows.service';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import {ModalWindowData} from "../../interfaces";

@Component({
  selector: 'app-modal-window',
  templateUrl: './modal-window.component.html',
  styleUrls: ['./modal-window.component.scss'],
})
export class ModalWindowComponent {
  @Input('modalName') modalName?: string;

  constructor(
    private modalWindowService: ModalWindowsService,
    public dialogRef: DialogRef<string>,
    @Inject(DIALOG_DATA) readonly data: ModalWindowData,
  ) {}

  closeModal(): void {
    if (this.modalName) {
      this.modalWindowService.closeModal(this.modalName);
    }
  }
}
