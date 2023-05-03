import { Component, Input } from '@angular/core';
import { ListService } from '../../services/list.service';
import { Dialog } from '@angular/cdk/dialog';
import { ModalWindowComponent } from '../../modal-window/modal-window.component';
import { ModalListNames } from '../../interfaces';
import { TaskService } from '../../services/task.service';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-edit-item-info',
  templateUrl: './edit-item-info.component.html',
  styleUrls: ['./edit-item-info.component.scss'],
})
export class EditItemInfoComponent {
  @Input('listTitle') listTitle?: string;
  @Input('id') id?: string;
  @Input('type') type?: string;
  @Input('labelType') labelType?: string;
  readonly modalListNames = ModalListNames;

  constructor(
    private listService: ListService,
    private dialog: Dialog,
    private taskService: TaskService,
    readonly themeService: ThemeService,
  ) {}

  async deleteList(): Promise<void> {
    if (this.type === 'list' && this.id) {
      this.listService.deleteList(this.id);
      await this.taskService.deleteTasksFromList(this.id);
    }
    if (this.type === 'task' && this.id) this.taskService.deleteTask(this.id);
  }

  openModalWindow(): void {
    const dialogRef =
      this.type === 'list'
        ? this.dialog.open(ModalWindowComponent, {
            data: { name: this.modalListNames.editList, id: this.id },
          })
        : this.dialog.open(ModalWindowComponent, { data: { name: this.modalListNames.editTask, id: this.id } });

    dialogRef.closed.subscribe();
  }
}
