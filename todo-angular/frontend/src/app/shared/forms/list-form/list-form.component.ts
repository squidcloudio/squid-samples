import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TodosService } from '../../../services/todos.service';
import { DialogRef } from '@angular/cdk/dialog';
import { ThemeService } from '../../../services/theme.service';

@Component({
  selector: 'app-list-form',
  templateUrl: './list-form.component.html',
  styleUrls: ['./list-form.component.scss'],
})
export class ListFormComponent {
  @Input('dialog') dialog?: DialogRef<string>;

  constructor(private todoService: TodosService, readonly themeService: ThemeService) {}

  colors: any[] = [
    { color: '#E441FF', name: 'Magenta' },
    { color: '#FF8D4D', name: 'Orange' },
    {
      color: '#FFD159',
      name: 'yellow',
    },
    { color: '#78FF8E', name: 'Green' },
    { color: '#42FEFE', name: 'Aqua' },
    { color: '#4484E5', name: 'Blue' },
  ];

  newListForm: FormGroup = new FormGroup({
    title: new FormControl(null, Validators.required),
    color: new FormControl(this.colors[0].name, Validators.required),
  });

  async setNewList(): Promise<void> {
    const currentColor = this.colors.filter(color => color.name === this.newListForm.get('color')?.value)[0].color;
    await this.todoService.createNewList(this.newListForm.get('title')?.value, currentColor);
    this.newListForm.reset();
    this.dialog?.close();
  }
}
