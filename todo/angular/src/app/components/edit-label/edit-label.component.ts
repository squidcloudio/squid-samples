import { Component, Input } from '@angular/core';
import { ThemeService } from '../../services/theme.service';
import { Dialog } from '@angular/cdk/dialog';
import { ModalWindowComponent } from '../../modal-window/modal-window.component';
import { ModalListNames } from '../../interfaces';

@Component({
  selector: 'app-edit-label',
  templateUrl: './edit-label.component.html',
  styleUrls: ['./edit-label.component.scss'],
})
export class EditLabelComponent {
  @Input('listId') listId?: string;
  @Input('labelType') labelType?: string;

  constructor(readonly themeService: ThemeService, private dialog: Dialog) {}

  openModalWindow(id: string): void {
    const dialogRef = this.dialog.open(ModalWindowComponent, { data: { name: ModalListNames.editLabel, id: id } });
    dialogRef.closed.subscribe();
  }
}
