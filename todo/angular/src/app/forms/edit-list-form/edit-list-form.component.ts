import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { DialogRef } from '@angular/cdk/dialog';
import { ListService } from '../../services/list.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-edit-item-info-form',
  templateUrl: 'edit-list-form.component.html',
  styleUrls: ['edit-list-form.component.scss'],
})
export class EditListFormComponent implements OnInit, OnDestroy {
  @Input('dialog') dialog?: DialogRef<string>;
  @Input('listId') listId?: string;
  @Input('labelType') labelType?: string;
  editLabelForm?: FormGroup;
  todoSub?: Subscription;

  constructor(
    private listService: ListService,
    readonly themeService: ThemeService,
  ) {}

  ngOnInit(): void {
    if (this.listId) {
      this.todoSub = this.listService.observeList(this.listId).subscribe(list => {
        this.editLabelForm = new FormGroup({
          title: new FormControl(list.title, [Validators.required, Validators.minLength(1), Validators.maxLength(20)]),
        });
      });
    }
  }

  onSubmit(): void {
    this.listService.changeListName(this.listId, this.editLabelForm?.get('title')?.value);
    this.dialog?.close();
  }

  ngOnDestroy(): void {
    this.todoSub?.unsubscribe();
  }
}
