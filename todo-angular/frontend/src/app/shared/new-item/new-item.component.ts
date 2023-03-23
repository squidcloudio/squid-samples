import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TodosService } from '../../services/todos.service';
import { ItemsService } from '../../services/items.service';
import { Observable } from 'rxjs';
import { Todo } from '../../interfaces/types';
import { DialogRef } from '@angular/cdk/dialog';

@Component({
  selector: 'app-new-item',
  templateUrl: './new-item.component.html',
  styleUrls: ['./new-item.component.scss'],
})
export class NewItemComponent {
  @Input('dialog') dialog?: DialogRef<string>;
  newItemForm: FormGroup = new FormGroup({
    list: new FormControl(null, Validators.required),
    title: new FormControl(null, Validators.required),
    description: new FormControl(null, Validators.required),
    dueDate: new FormControl(new Date(), Validators.required),
    tag: new FormControl(null, Validators.required),
  });
  collectionsObs: Observable<Todo[]>;

  constructor(private todoService: TodosService, private itemService: ItemsService) {
    this.collectionsObs = this.todoService.getUserCollection();
  }
}
