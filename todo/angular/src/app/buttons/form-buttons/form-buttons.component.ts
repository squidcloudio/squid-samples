import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ListService } from '../../services/list.service';
import { DialogRef } from '@angular/cdk/dialog';

@Component({
  selector: 'app-form-buttons',
  templateUrl: 'form-buttons.component.html',
  styleUrls: ['form-button.component.scss'],
})
export class FormButtonsComponent {
  @Input('control') control?: FormGroup;
  @Input('modalName') modalName?: string;
  @Input('submitName') submitName?: string;
  @Input('dialog') dialog?: DialogRef<string>;

  constructor(readonly listService: ListService) {}
}
