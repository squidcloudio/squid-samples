import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ListService } from '../../services/list.service';
import { TaskService } from '../../services/task.service';
import { Task, List } from '../../interfaces';
import { DialogRef } from '@angular/cdk/dialog';
import { AccountService } from '../../services/account.service';
import * as dayjs from 'dayjs';
import { Subscription } from 'rxjs';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss'],
})
export class TaskFormComponent implements OnInit, OnDestroy {
  @Input('dialog') dialog?: DialogRef<string>;
  @Input('taskId') taskId?: string;
  @Input('title') title?: string;
  @Input('submitName') submitName?: string;
  @Input('date') date?: string;
  newTaskForm?: FormGroup;
  currentTask?: Task;
  taskObs?: Subscription;
  readonly currentList?: List;

  constructor(
    private listService: ListService,
    private taskService: TaskService,
    private accountService: AccountService,
    readonly themeService: ThemeService,
  ) {
    this.currentList = this.listService.currentList;
  }

  ngOnInit(): void {
    if (!this.taskId)
      this.newTaskForm = new FormGroup({
        title: new FormControl(null, Validators.required),
        description: new FormControl(null, Validators.required),
        dueDate: new FormControl(this.date ? new Date(this.date) : null, Validators.required),
        tags: new FormControl([], Validators.required),
        listId: new FormControl(
          this.currentList?.id === 'today' || this.currentList?.id === 'tomorrow' || this.currentList?.id === 'someday'
            ? null
            : this.currentList?.id,
          Validators.required,
        ),
        listColor: new FormControl(
          this.currentList?.id === 'today' || this.currentList?.id === 'tomorrow' || this.currentList?.id === 'someday'
            ? null
            : this.currentList?.color,
          Validators.required,
        ),
      });

    if (this.taskId)
      this.taskObs = this.taskService.observeTask(this.taskId).subscribe(task => {
        this.currentTask = task;
        this.newTaskForm = new FormGroup({
          title: new FormControl(this.currentTask.title, Validators.required),
          description: new FormControl(task.description, Validators.required),
          dueDate: new FormControl(new Date(task.dueDate), Validators.required),
          tags: new FormControl(task.tags, Validators.required),
          listId: new FormControl(task.listId, Validators.required),
          listColor: new FormControl(task.listColor, Validators.required),
        });
      });
  }

  async onSubmit(): Promise<void> {
    const currentUser = await this.accountService.getUser();
    if (!this.currentList) return;
    if (!currentUser) return;
    const newId = self.crypto.randomUUID();
    const newItem: Task = {
      title: this.newTaskForm?.get('title')?.value,
      description: this.newTaskForm?.get('description')?.value,
      dueDate: dayjs(this.newTaskForm?.get('dueDate')?.value).format('M/D/YYYY'),
      tags: this.newTaskForm?.get('tags')?.value,
      listId: this.newTaskForm?.get('listId')?.value,
      listColor: this.newTaskForm?.get('listColor')?.value,
      userId: currentUser.id,
      completed: false,
      id: newId,
    };
    if (this.taskId) {
      await this.taskService.changeTask(this.taskId, newItem);
    } else {
      this.taskService.addNewTask(newItem);
      this.newTaskForm?.reset();
    }

    this.dialog?.close();
  }
  ngOnDestroy(): void {
    this.taskObs?.unsubscribe();
  }
}
