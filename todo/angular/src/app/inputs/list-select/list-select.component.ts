import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ListService } from 'src/app/services/list.service';
import { ThemeService } from 'src/app/services/theme.service';
import { Color, List } from '../../interfaces';
import { Observable } from 'rxjs';
import { FormGroup } from '@angular/forms';

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

  constructor(readonly themeService: ThemeService, private listService: ListService) {}

  selectList(list: List): void {
    if (list.id) {
      this.selectedList = list;
      this.control && this.control.get('listId')?.setValue(list.id);
    }
  }

  ngOnInit(): void {
    this.listObs.subscribe(data => {
      this.listCollection = data;
      const isListInCollection = this.listCollection.filter(list => list.id === this.listService.currentList?.id);
      this.selectedList = isListInCollection.length ? isListInCollection[0] : this.listCollection[0];
    });
  }

  ngOnDestroy(): void {
    this.listObs.subscribe();
  }
}
