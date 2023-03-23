import { Component, Input } from '@angular/core';
import { ModalWindowsService } from '../../services/modalWindows.service';

@Component({
  selector: 'app-modal-window',
  templateUrl: './modal-window.component.html',
  styleUrls: ['./modal-window.component.scss'],
})
export class ModalWindowComponent {
  @Input('modalName') modalName?: string;

  constructor(private modalWindowService: ModalWindowsService) {}

  closeModal(): void {
    if (this.modalName) {
      this.modalWindowService.closeModal(this.modalName);
    }
  }
}
