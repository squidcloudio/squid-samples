import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ListService } from '../../services/list.service';
import { DialogRef } from '@angular/cdk/dialog';
import { ThemeService } from '../../services/theme.service';
import { Color } from '../../interfaces';

@Component({
  selector: 'app-list-form',
  templateUrl: './list-form.component.html',
  styleUrls: ['./list-form.component.scss'],
})
export class ListFormComponent {
  @Input('dialog') dialog?: DialogRef<string>;
  colors: any[] = [
    { color: '#E441FF', name: 'Magenta' },
    { color: '#FF8D4D', name: 'Orange' },
    {
      color: '#FFD159',
      name: 'Yellow',
    },
    { color: '#78FF8E', name: 'Green' },
    { color: '#42FEFE', name: 'Aqua' },
    { color: '#4484E5', name: 'Blue' },
  ];
  selectedColor: Color = this.colors[0];
  constructor(private listService: ListService, readonly themeService: ThemeService) {}

  newListForm: FormGroup = new FormGroup({
    title: new FormControl(null, Validators.required),
    color: new FormControl(this.selectedColor.name, Validators.required),
  });

  async setNewList(): Promise<void> {
    const currentColor = this.colors.filter(color => color.name === this.newListForm.get('color')?.value)[0].color;
    await this.listService.createNewList(this.newListForm.get('title')?.value, currentColor);
    this.newListForm.reset();
    this.dialog?.close();
  }
  selectColor(color: { color: string; name: string }): void {
    this.selectedColor = color;
  }
}
