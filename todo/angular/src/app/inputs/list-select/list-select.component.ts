import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ListService } from 'src/app/services/list.service';
import { ThemeService } from 'src/app/services/theme.service';
import { List, ModalListNames } from '../../interfaces';
import { Observable } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { Dialog } from '@angular/cdk/dialog';
import { ModalWindowComponent } from 'src/app/modal-window/modal-window.component';

@Component({
  selector: 'app-list-select',
  templateUrl: './list-select.component.html',
  styleUrls: ['./list-select.component.scss'],
})
export class ListSelectComponent implements OnInit, OnDestroy {
  @Input('control') control?: FormGroup;
  listCollection?: any[];
  selectedList?: List;
  listObs: Observable<List[]> = this.listService.observeUserCollection();

  constructor(
    readonly themeService: ThemeService,
    private listService: ListService,
    private dialog: Dialog,
  ) {}

  selectList(list?: List): void {
    if (list) {
      this.selectedList = list;
      this.control && this.control.get('listId')?.setValue(list.id);
      this.control && this.control.get('listColor')?.setValue(list.color);
    }
  }

  ngOnInit(): void {
    this.listObs.subscribe(data => {
      this.listCollection = data;
      const isListInCollection = this.listCollection.filter(list => list.id === this.control?.get('listId')?.value);
      this.selectedList = isListInCollection.length ? isListInCollection[0] : this.listCollection[0];
      this.control && this.control.get('listId')?.setValue(this.selectedList?.id);
      this.control && this.control.get('listColor')?.setValue(this.selectedList?.color);
    });
  }

  ngOnDestroy(): void {
    this.listObs.subscribe();
  }

  openNewListWindow(): void {
    const dialogRef = this.dialog.open(ModalWindowComponent, { data: { name: ModalListNames.newList } });
    dialogRef.closed.subscribe();
  }
}
