import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { DialogRef } from '@angular/cdk/dialog';
import { TodosService } from '../../../services/todos.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-todo-form',
  templateUrl: 'edit-todo-form.component.html',
  styleUrls: ['edit-todo-form.component.scss'],
})
export class EditTodoFormComponent implements OnInit, OnDestroy {
  @Input('dialog') dialog?: DialogRef<string>;
  @Input('todoId') todoId?: string;
  editTodoForm?: FormGroup = new FormGroup({});
  todoSub?: Subscription;
  constructor(private todoService: TodosService) {}
  ngOnInit(): void {
    if (this.todoId)
      this.todoSub = this.todoService.todo(this.todoId).subscribe(todo => {
        console.log(todo);
        this.editTodoForm = new FormGroup({
          title: new FormControl(todo.title, Validators.required),
        });
      });
  }
  onSubmit(): void {
    if (this.todoId && this.editTodoForm) {
      this.todoService.changeTodo(this.todoId, this.editTodoForm.get('title')?.value);
      this.editTodoForm.reset();
      this.dialog?.close();
    }
  }
  ngOnDestroy(): void {
    this.todoSub?.unsubscribe();
  }
}
