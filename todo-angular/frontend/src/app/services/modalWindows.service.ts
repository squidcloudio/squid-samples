import { Injectable } from '@angular/core';
import { IModalWindow } from '../interfaces/interfaces';

@Injectable({ providedIn: 'root' })
export class ModalWindowsService {
  modalWindows: IModalWindow = {
    newList: true,
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
