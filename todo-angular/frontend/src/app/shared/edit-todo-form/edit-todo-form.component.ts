import { Component, Input, OnInit } from '@angular/core';
import { DialogRef } from '@angular/cdk/dialog';
import { TodosService } from '../../services/todos.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-todo-form',
  templateUrl: 'edit-todo-form.component.html',
  styleUrls: ['edit-todo-form.component.scss'],
})
export class EditTodoFormComponent implements OnInit {
  @Input('dialog') dialog?: DialogRef<string>;
  @Input('todoTitle') todoTitle?: string;
  @Input('todoId') todoId?: string;
  editTodoForm?: FormGroup=new FormGroup({})
  constructor(private todoService: TodosService) {}
  ngOnInit(): void {
    this.editTodoForm=new FormGroup({
      'title': new FormControl(this.todoTitle,Validators.required)
    })
  }
  onSubmit(): void {
    if(this.todoId && this.editTodoForm){
      this.todoService.changeTodo(this.todoId,this.editTodoForm.get('title')?.value)
      this.editTodoForm.reset()
      this.dialog?.close()
    }
  }
}
