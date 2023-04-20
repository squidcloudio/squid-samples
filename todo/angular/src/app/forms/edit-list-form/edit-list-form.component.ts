import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { DialogRef } from '@angular/cdk/dialog';
import { ListService } from '../../services/list.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-edit-list-form',
  templateUrl: 'edit-list-form.component.html',
  styleUrls: ['edit-list-form.component.scss'],
})
export class EditListFormComponent implements OnInit, OnDestroy {
  @Input('dialog') dialog?: DialogRef<string>;
  @Input('listId') listId?: string;
  editListForm?: FormGroup;
  todoSub?: Subscription;
  constructor(private listService: ListService, readonly themeService: ThemeService) {}
  ngOnInit(): void {
    if (this.listId) {
      this.todoSub = this.listService.observeList(this.listId).subscribe(todo => {
        this.editListForm = new FormGroup({
          title: new FormControl(todo.title, Validators.required),
        });
      });
    }
  }
  onSubmit(): void {
    if (this.listId && this.editListForm) {
      this.listService.changeList(this.listId, this.editListForm.get('title')?.value);
      this.editListForm.reset();
      this.dialog?.close();
    }
  }
  ngOnDestroy(): void {
    this.todoSub?.unsubscribe();
  }
}
