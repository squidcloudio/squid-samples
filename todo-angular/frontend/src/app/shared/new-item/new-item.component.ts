import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TodosService } from '../../services/todos.service';
import { ItemsService } from '../../services/items.service';
import { Item, Todo } from '../../interfaces';
import { DialogRef } from '@angular/cdk/dialog';
import { AccountService } from '../../services/account.service';
import * as moment from 'moment';

@Component({
  selector: 'app-new-item',
  templateUrl: './new-item.component.html',
  styleUrls: ['./new-item.component.scss'],
})
export class NewItemComponent implements OnInit {
  @Input('dialog') dialog?: DialogRef<string>;
  @Input('itemId') itemId?: string;
  @Input('title') title?: string;
  @Input('submitName') submitName?: string;
  newItemForm?: FormGroup;
  readonly currentTodo?: Todo;

  constructor(
    private todoService: TodosService,
    private itemService: ItemsService,
    private accountService: AccountService,
  ) {
    this.currentTodo = this.todoService.currentTodo;
  }
  ngOnInit(): void {
    if (!this.itemId)
      this.newItemForm = new FormGroup({
        title: new FormControl(null, Validators.required),
        description: new FormControl(null, Validators.required),
        dueDate: new FormControl(null, Validators.required),
        tags: new FormControl([], Validators.required),
      });

    if (this.itemId)
      this.itemService.getItem(this.itemId).subscribe(item => {
        this.newItemForm = new FormGroup({
          title: new FormControl(item.title, Validators.required),
          description: new FormControl(item.description, Validators.required),
          dueDate: new FormControl(new Date(item.dueDate), Validators.required),
          tags: new FormControl(item.tags, Validators.required),
        });
      });
  }

  async onSubmit(): Promise<void> {
    const currentUser = await this.accountService.getUser();
    if (!this.currentTodo) return;
    if (!currentUser) return;
    const newId = self.crypto.randomUUID();
    const newItem: Item = {
      title: this.newItemForm?.get('title')?.value,
      description: this.newItemForm?.get('description')?.value,
      dueDate: moment(this.newItemForm?.get('dueDate')?.value).format('M/D/YYYY'),
      tags: this.newItemForm?.get('tags')?.value,
      todoId: this.currentTodo.id,
      userId: currentUser.id,
      completed: false,
      id: newId,
    };
    if (this.itemId) {
      await this.itemService.changeItem(this.itemId, newItem);
    } else {
      this.itemService.addNewItem(newItem);
      this.newItemForm?.reset();
    }

    this.dialog?.close();
  }
}
