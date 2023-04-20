import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ListService } from '../../services/list.service';
import { TaskService } from '../../services/tasks.service';
import { Task, List } from '../../interfaces';
import { DialogRef } from '@angular/cdk/dialog';
import { AccountService } from '../../services/account.service';
import * as dayjs from 'dayjs';
import { Subscription } from 'rxjs';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-item-form',
  templateUrl: './item-form.component.html',
  styleUrls: ['./item-form.component.scss'],
})
export class ItemFormComponent implements OnInit, OnDestroy {
  @Input('dialog') dialog?: DialogRef<string>;
  @Input('itemId') itemId?: string;
  @Input('title') title?: string;
  @Input('submitName') submitName?: string;
  @Input('date') date?: string;
  newItemForm?: FormGroup;
  currentItem?: Task;
  itemObs?: Subscription;
  readonly currentTodo?: List;

  constructor(
    private listService: ListService,
    private taskService: TaskService,
    private accountService: AccountService,
    readonly themeService: ThemeService,
  ) {
    this.currentTodo = this.listService.currentList;
  }

  ngOnInit(): void {
    if (!this.itemId)
      this.newItemForm = new FormGroup({
        title: new FormControl(null, Validators.required),
        description: new FormControl(null, Validators.required),
        dueDate: new FormControl(this.date ? new Date(this.date) : null, Validators.required),
        tags: new FormControl([], Validators.required),
      });

    if (this.itemId)
      this.itemObs = this.taskService.observeTask(this.itemId).subscribe(item => {
        this.currentItem = item;
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
    const isCurrentTodoDefault =
      this.currentTodo.id === 'today' || this.currentTodo.id === 'tomorrow' || this.currentTodo.id === 'someday';
    const newId = self.crypto.randomUUID();
    const newItem: Task = {
      title: this.newItemForm?.get('title')?.value,
      description: this.newItemForm?.get('description')?.value,
      dueDate: dayjs(this.newItemForm?.get('dueDate')?.value).format('M/D/YYYY'),
      tags: this.newItemForm?.get('tags')?.value,
      todoId: this.currentItem ? this.currentItem.todoId : this.currentTodo.id,
      todoColor: this.currentItem ? this.currentItem.todoColor : this.currentTodo.color,
      userId: currentUser.id,
      completed: false,
      id: newId,
    };
    if (this.itemId) {
      await this.taskService.changeTask(this.itemId, newItem);
    } else {
      this.taskService.addNewTask(isCurrentTodoDefault ? { ...newItem, todoId: '', todoColor: '' } : newItem);
      this.newItemForm?.reset();
    }

    this.dialog?.close();
  }
  ngOnDestroy(): void {
    this.itemObs?.unsubscribe();
  }
}
