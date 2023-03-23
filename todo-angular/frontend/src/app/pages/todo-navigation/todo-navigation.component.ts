import { Component } from '@angular/core';
import { TodosService } from '../../services/todos.service';
import { Todo } from '../../interfaces/types';
import { Observable } from 'rxjs';
import { ModalListNames } from '../../interfaces/interfaces';
import { Dialog } from '@angular/cdk/dialog';
import { ModalWindowComponent } from '../../shared/modal-window/modal-window.component';

@Component({
  selector: 'app-todo-navigation',
  templateUrl: './todo-navigation.component.html',
  styleUrls: ['./todo-navigation.component.scss'],
})
export class TodoNavigationComponent {
  constructor(public dialog: Dialog) {}

  createNewList(): void {
    const dialogRef = this.dialog.open(ModalWindowComponent, { data: { name: ModalListNames.newList } });
    dialogRef.closed.subscribe();
  }
}
