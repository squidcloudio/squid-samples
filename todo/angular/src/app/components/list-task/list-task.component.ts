import { Component, Input, OnInit } from '@angular/core';
import { Task } from '../../interfaces';
import { TaskService } from '../../services/task.service';
import { Dialog } from '@angular/cdk/dialog';
import { ModalWindowComponent } from '../../modal-window/modal-window.component';
import { ModalListNames } from '../../interfaces';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-list-task',
  templateUrl: 'list-task.component.html',
  styleUrls: ['list-task.component.scss'],
})
export class ListTaskComponent implements OnInit {
  @Input('task') task?: Task;
  @Input('taskId') taskId?: string;
  formatDateFormTask?: string;
  readonly modalWindowName = ModalListNames;
  constructor(private taskService: TaskService, private dialog: Dialog, readonly themeService: ThemeService) {}

  ngOnInit(): void {
    if (this.task)
      this.formatDateFormTask = new Date(this.task?.dueDate).toLocaleDateString('en-Us', {
        month: 'short',
        day: 'numeric',
      });
  }

  async changeTaskStatus(id?: string): Promise<void> {
    if (id) {
      await this.taskService.changeTaskStatus(id);
    }
  }

  openModalWindow(windowName: string): void {
    const dialogRef = this.dialog.open(ModalWindowComponent, { data: { name: windowName, id: this.taskId } });
    dialogRef.closed.subscribe();
  }
}
