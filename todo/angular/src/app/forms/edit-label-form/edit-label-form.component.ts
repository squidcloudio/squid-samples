import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { DialogRef } from '@angular/cdk/dialog';
import { ListService } from '../../services/list.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-edit-label-form',
  templateUrl: 'edit-label-form.component.html',
  styleUrls: ['edit-label-form.component.scss'],
})
export class EditLabelFormComponent implements OnInit, OnDestroy {
  @Input('dialog') dialog?: DialogRef<string>;
  @Input('listId') listId?: string;
  @Input('labelType') labelType?: string;
  editLabelForm?: FormGroup;
  todoSub?: Subscription;
  constructor(private listService: ListService, readonly themeService: ThemeService) {}
  ngOnInit(): void {
    if (this.listId) {
      this.todoSub = this.listService.observeList(this.listId).subscribe(list => {
        this.editLabelForm = new FormGroup({
          label: new FormControl(this.labelType === 'activeLabel' ? list.activeLabel : list.completeLabel, [
            Validators.required,
            Validators.minLength(5),
            Validators.maxLength(20),
          ]),
          listId: new FormControl(list.id, Validators.required),
        });
      });
    }
  }
  onSubmit(): void {
    if (
      this.editLabelForm?.get('listId')?.value === 'today' ||
      this.editLabelForm?.get('listId')?.value === 'tomorrow' ||
      this.editLabelForm?.get('listId')?.value === 'someday'
    )
      this.editLabelForm?.get('listId')?.setValue(null);
    if (this.listId && this.editLabelForm?.valid && this.labelType) {
      this.listService.changeListLabel(
        this.editLabelForm.get('listId')?.value,
        this.editLabelForm.get('label')?.value,
        this.labelType,
      );
      this.editLabelForm.reset();
      this.dialog?.close();
    }
  }
  ngOnDestroy(): void {
    this.todoSub?.unsubscribe();
  }
}
