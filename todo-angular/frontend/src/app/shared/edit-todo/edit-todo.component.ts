import {Component, Input} from '@angular/core';
import { TodosService } from '../../services/todos.service';
import { Dialog } from '@angular/cdk/dialog';
import { ModalWindowComponent } from '../modal-window/modal-window.component';
import { ModalListNames } from '../../interfaces';

@Component({
  selector: 'app-edit-todo',
  templateUrl: './edit-todo.component.html',
  styleUrls: ['./edit-todo.component.scss'],
})
export class EditTodoComponent {
  @Input('todoTitle') todoTitle?:string;
  @Input('todoId') todoId?:string;
  readonly modalListNames = ModalListNames;
  constructor(private todoService: TodosService, private dialog: Dialog) {}

  deleteTodo(): void {
    this.todoService.deleteTodo();
  }
  openModalWindow(windowName: string, value?: string): void {
    const dialogRef = this.dialog.open(ModalWindowComponent, { data: { name: windowName, id:this.todoId } });
    dialogRef.closed.subscribe();
  }
}
