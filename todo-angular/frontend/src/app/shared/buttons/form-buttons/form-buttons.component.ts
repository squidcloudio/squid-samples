import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ModalWindowsService } from '../../../services/modalWindows.service';

@Component({
  selector: 'app-form-buttons',
  templateUrl: 'form-buttons.component.html',
  styleUrls: ['form-button.component.scss'],
})
export class FormButtonsComponent {
  @Input('control') control?: FormGroup;
  @Input('modalName') modalName?: string;
  @Input('submitName') submitName?: string;

  constructor(private modalWindowService: ModalWindowsService) {}

  closeModalWindow(): void {
    if (this.modalName) this.modalWindowService.closeModal(this.modalName);
  }
}
