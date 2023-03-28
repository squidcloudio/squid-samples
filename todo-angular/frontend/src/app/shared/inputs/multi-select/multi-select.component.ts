import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Tag } from '../../../interfaces';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-multiselect',
  templateUrl: 'multi-select.component.html',
  styleUrls: ['multi-select.component.scss'],
})
export class MultiSelectComponent {
  @Input('control') control?: FormGroup;
  @ViewChild('inputRef') inputRef?: ElementRef;
  currentTag = '';
  tags = ['product', 'weekly'];

  selectedTags: Tag[] = [];

  focus(e: MouseEvent): void {
    e.stopImmediatePropagation();
  }

  addTagFromInput(): void {
    if (this.currentTag && this.control) {
      const newId = self.crypto.randomUUID();
      const newTag = { id: newId, name: this.currentTag };
      this.selectedTags.push(newTag);
    }
    this.currentTag = '';
    this.control?.get('tags')?.setValue(this.selectedTags);
  }

  deleteTage(id: string): void {
    const filteredArray = this.selectedTags.filter(tag => tag.id !== id);
    this.selectedTags = filteredArray;
    this.control?.get('tags')?.setValue(this.selectedTags);
  }
}
