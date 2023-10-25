import { Component, Input } from '@angular/core';
import { ThemeService } from '../../services/theme.service';
import { Dialog } from '@angular/cdk/dialog';
import { ModalWindowComponent } from '../../modal-window/modal-window.component';
import { ModalListNames } from '../../interfaces';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-edit-label',
  templateUrl: './edit-label.component.html',
  styleUrls: ['./edit-label.component.scss'],
})
export class EditLabelComponent {
  @Input('listId') listId?: string;
  @Input('labelType') labelType?: string;

  constructor(
    readonly themeService: ThemeService,
    private dialog: Dialog,
    private taskService: TaskService,
  ) {}

  openModalWindow(id: string): void {
    const dialogRef = this.dialog.open(ModalWindowComponent, { data: { name: ModalListNames.editLabel, id: id } });
    dialogRef.closed.subscribe();
  }
  async markAllAsComplete(listId: string): Promise<void> {
    await this.taskService.markAllTasksAsComplete(listId);
  }

  async clearAllTasks(listId: string): Promise<void> {
    await this.taskService.clearAllCompleteTasks(listId);
  }
}
