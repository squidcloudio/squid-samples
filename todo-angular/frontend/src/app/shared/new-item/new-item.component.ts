import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TodosService } from '../../services/todos.service';
import { ItemsService } from '../../services/items.service';
import { Item, Todo } from '../../interfaces';
import { DialogRef } from '@angular/cdk/dialog';
import { AccountService } from '../../services/account.service';

@Component({
  selector: 'app-new-item',
  templateUrl: './new-item.component.html',
  styleUrls: ['./new-item.component.scss'],
})
export class NewItemComponent {
  @Input('dialog')  dialog?: DialogRef<string>;

  readonly newItemForm: FormGroup = new FormGroup({
    title: new FormControl(null, Validators.required),
    description: new FormControl(null, Validators.required),
    dueDate: new FormControl(null, Validators.required),
    tags: new FormControl([], Validators.required),
  });
 readonly currentTodo?: Todo;

  constructor(
    private todoService: TodosService,
    private itemService: ItemsService,
    private accountService: AccountService,
  ) {
    this.currentTodo = this.todoService.currentTodo;
  }

  async onSubmit(): Promise<void> {
    const currentUser = await this.accountService.getUser();
    if (!this.currentTodo) return;
    if (!currentUser) return;
    const newId = self.crypto.randomUUID();
    const newItem: Item = {
      title: this.newItemForm.get('title')?.value,
      description: this.newItemForm.get('description')?.value,
      dueDate: new Date(this.newItemForm.get('dueDate')?.value).toLocaleDateString('en-Us', {
        month: 'numeric',
        day: 'numeric',
        year: 'numeric',
      }),
      tags: this.newItemForm.get('tags')?.value,
      todoId: this.currentTodo.id,
      userId: currentUser.id,
      completed: false,
      id: newId,
    };
    this.itemService.addNewItem(newItem);
    this.newItemForm.reset();
    this.dialog?.close();
  }
}
