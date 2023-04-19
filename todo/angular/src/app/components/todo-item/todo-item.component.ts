import { Component, Input, OnInit } from '@angular/core';
import { Item } from '../../interfaces';
import { ItemsService } from '../../services/items.service';
import { Dialog } from '@angular/cdk/dialog';
import { ModalWindowComponent } from '../../modal-window/modal-window.component';
import { ModalListNames } from '../../interfaces';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-todo-item',
  templateUrl: 'todo-item.component.html',
  styleUrls: ['todo-item.component.scss'],
})
export class TodoItemComponent implements OnInit {
  @Input('item') item?: Item;
  @Input('itemId') itemId?: string;
  formatDateFormItem?: string;
  readonly modalWindowName = ModalListNames;
  constructor(private itemService: ItemsService, private dialog: Dialog, readonly themeService: ThemeService) {}

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

  openModalWindow(windowName: string): void {
    const dialogRef = this.dialog.open(ModalWindowComponent, { data: { name: windowName, id: this.itemId } });
    dialogRef.closed.subscribe();
  }
}
