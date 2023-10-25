import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { List } from '../../interfaces';
import { ListService } from '../../services/list.service';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-list-catalogue',
  templateUrl: './list-catalogue.component.html',
  styleUrls: ['./list-catalogue.component.scss'],
})
export class ListCatalogueComponent implements OnInit {
  @Input('listType') listType!: string;
  listCatalogObs?: Observable<List[]>;
  currentList?: List;

  constructor(
    private listService: ListService,
    readonly themeService: ThemeService,
  ) {}

  ngOnInit(): void {
    this.listCatalogObs =
      this.listType === 'defaultCollection'
        ? this.listService.observeDefaultCollection()
        : this.listService.observeUserCollection();
  }
}
