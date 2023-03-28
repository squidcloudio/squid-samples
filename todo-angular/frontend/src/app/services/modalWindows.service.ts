import { Injectable } from '@angular/core';
import { ModalWindow } from '../interfaces';

@Injectable({ providedIn: 'root' })
export class ModalWindowsService {
  modalWindows: ModalWindow = {
    newList: false,
    newItem: false,
  };

  openModal(modalName: string): void {
    this.modalWindows[modalName] = true;
    console.log(this.modalWindows);
  }

  closeModal(modalName: string): void {
    this.modalWindows[modalName] = false;
  }
}
