import { Component, Input } from '@angular/core';
import { TodosService } from '../../services/todos.service';
import { Dialog } from '@angular/cdk/dialog';
import { ModalWindowComponent } from '../../shared/modal-window/modal-window.component';
import { ModalListNames } from '../../interfaces';
import { ItemsService } from '../../services/items.service';
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
    private todoService: TodosService,
    private dialog: Dialog,
    private itemService: ItemsService,
    readonly themeService: ThemeService,
  ) {}

  async deleteTodo(): Promise<void> {
    if (this.type === 'todo' && this.id) {
      this.todoService.deleteTodo(this.id);
      await this.itemService.deleteItemsFromTodo(this.id);
    }
    if (this.type === 'item' && this.id) this.itemService.deleteItem(this.id);
  }
  openModalWindow(): void {
    const dialogRef =
      this.type === 'todo'
        ? this.dialog.open(ModalWindowComponent, { data: { name: this.modalListNames.editTodo, id: this.id } })
        : this.dialog.open(ModalWindowComponent, { data: { name: this.modalListNames.editItem, id: this.id } });

    dialogRef.closed.subscribe();
  }
}
