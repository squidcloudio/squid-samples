import { Component, ElementRef, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Tag } from '../../interfaces';
import { FormGroup } from '@angular/forms';
import { ThemeService } from '../../services/theme.service';

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
    { id: '3', name: 'daily' },
    { id: '4', name: 'delay' },
    { id: '5', name: 'urgent' },
  ];

  selectedTags: Tag[] = [];

  constructor(private renderer: Renderer2, readonly themeService: ThemeService) {}
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
    const isItemInArray = this.selectedTags.find(tag => tag.id === item.id);
    if (!isItemInArray) this.selectedTags.push(item);
    this.control?.get('tags')?.setValue(this.selectedTags);
    this.renderer.setProperty(this.inputRef?.nativeElement, 'value', '');
  }

  deleteTage(id: string): void {
    this.selectedTags = this.selectedTags.filter(tag => tag.id !== id);
    this.control?.get('tags')?.setValue(this.selectedTags);
  }
}
