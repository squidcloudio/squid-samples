import { Component, ElementRef, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Tag } from '../../../interfaces';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-multiselect',
  templateUrl: 'multi-select.component.html',
  styleUrls: ['multi-select.component.scss'],
})
export class MultiSelectComponent implements OnInit {
  @Input('control') control?: FormGroup;
  @ViewChild('inputRef') inputRef?: ElementRef;
  tags = [
    { id: '1', name: 'product' },
    { id: '2', name: 'weekly' },
  ];

  selectedTags: Tag[] = [];

  constructor(private renderer: Renderer2) {}
  focus(e: MouseEvent): void {
    e.stopImmediatePropagation();
  }
  ngOnInit(): void {
    if (this.control) {
      this.selectedTags = [...this.control.get('tags')?.value];
    }
  }

  addTagFromInput(): void {
    if (this.control && this.inputRef?.nativeElement.value.trim()) {
      const newId = self.crypto.randomUUID();
      const newTag = { id: newId, name: this.inputRef?.nativeElement.value };
      this.selectedTags.push(newTag);
    }
    this.renderer.setProperty(this.inputRef?.nativeElement, 'value', '');
    this.control?.get('tags')?.setValue(this.selectedTags);
  }

  addTagFromSelect(item: { id: string; name: string }): void {
    this.selectedTags.push(item);
    this.control?.get('tags')?.setValue(this.selectedTags);
    this.renderer.setProperty(this.inputRef?.nativeElement, 'value', '');
  }

  deleteTage(id: string): void {
    const filteredArray = this.selectedTags.filter(tag => tag.id !== id);
    this.selectedTags = filteredArray;
    this.control?.get('tags')?.setValue(this.selectedTags);
  }
}
