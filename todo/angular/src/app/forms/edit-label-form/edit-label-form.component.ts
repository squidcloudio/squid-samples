import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ListService } from '../../services/list.service';
import { Subscription } from 'rxjs';
import { ThemeService } from '../../services/theme.service';
import { DialogRef } from '@angular/cdk/dialog';

@Component({
  selector: 'app-edit-label-form',
  templateUrl: './edit-label-form.component.html',
  styleUrls: ['./edit-label-form.component.scss'],
})
export class EditLabelFormComponent implements OnInit, OnDestroy {
  @Input('listId') listId?: string;
  @Input('dialog') dialog?: DialogRef<string>;
  labelForm?: FormGroup;
  listSub?: Subscription;
  constructor(
    private listService: ListService,
    readonly themeService: ThemeService,
  ) {}

  ngOnInit(): void {
    if (this.listId)
      this.listSub = this.listService.observeList(this.listId).subscribe(list => {
        this.labelForm = new FormGroup({
          activeLabel: new FormControl(list.activeLabel, [
            Validators.required,
            Validators.minLength(2),
            Validators.maxLength(20),
          ]),
          completeLabel: new FormControl(list.completeLabel, [
            Validators.required,
            Validators.minLength(2),
            Validators.maxLength(20),
          ]),
        });
      });
  }
  submit(): void {
    this.listService.changeLabels(
      this.listId,
      this.labelForm?.get('activeLabel')?.value,
      this.labelForm?.get('completeLabel')?.value,
    );
    this.dialog?.close();
  }
  ngOnDestroy(): void {
    this.listSub?.unsubscribe();
  }
}
