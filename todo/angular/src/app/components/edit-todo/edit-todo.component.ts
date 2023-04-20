import { Component, Input } from '@angular/core';
import { ListService } from '../../services/list.service';
import { Dialog } from '@angular/cdk/dialog';
import { ModalWindowComponent } from '../../modal-window/modal-window.component';
import { ModalListNames } from '../../interfaces';
import { TaskService } from '../../services/tasks.service';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-edit-todo',
  templateUrl: './edit-todo.component.html',
  styleUrls: ['./edit-todo.component.scss'],
})
export class EditTodoComponent {
  @Input('todoTitle') todoTitle?: string;
  @Input('id') id?: string;
  @Input('type') type?: string;
  readonly modalListNames = ModalListNames;
  constructor(
    private listService: ListService,
    private dialog: Dialog,
    private taskService: TaskService,
    readonly themeService: ThemeService,
  ) {}

  async deleteList(): Promise<void> {
    if (this.type === 'todo' && this.id) {
      this.listService.deleteList(this.id);
      await this.taskService.deleteTasksFromList(this.id);
    }
    if (this.type === 'item' && this.id) this.taskService.deleteTask(this.id);
  }
  openModalWindow(): void {
    const dialogRef =
      this.type === 'todo'
        ? this.dialog.open(ModalWindowComponent, { data: { name: this.modalListNames.editList, id: this.id } })
        : this.dialog.open(ModalWindowComponent, { data: { name: this.modalListNames.editTask, id: this.id } });

    dialogRef.closed.subscribe();
  }
}
