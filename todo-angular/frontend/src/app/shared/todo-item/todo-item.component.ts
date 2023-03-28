import { Component, Input, OnInit } from '@angular/core';
import { Item } from '../../interfaces';
import { ItemsService } from '../../services/items.service';

@Component({
  selector: 'app-todo-item',
  templateUrl: 'todo-item.component.html',
  styleUrls: ['todo-item.component.scss'],
})
export class TodoItemComponent implements OnInit {
  @Input('item') item?: Item;
  formatDateFormItem?: string;

  constructor(private itemService: ItemsService) {}

  ngOnInit(): void {
    if (this.item)
      this.formatDateFormItem = new Date(this.item?.dueDate).toLocaleDateString('en-Us', {
        month: 'short',
        day: 'numeric',
      });
  }

  async changeItemStatus(id?: string): Promise<void> {
    if (id) {
      await this.itemService.changeItemStatus(id);
    }
  }
}
