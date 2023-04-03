import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import * as moment from 'moment';

import { Item } from '../../interfaces';
import { ItemsService } from '../../services/items.service';
import { FormatTypes } from '../../interfaces';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-calendar-sidebar',
  templateUrl: './calendar-sidebar.component.html',
  styleUrls: ['./calendar-sidebar.component.scss'],
})
export class CalendarSidebarComponent implements OnInit {
  expiredItemsObs?: Observable<Item[]>;
  constructor(private itemService: ItemsService, readonly themeService: ThemeService) {}
  ngOnInit(): void {
    this.expiredItemsObs = this.itemService.getItems().pipe(
      map(items =>
        items.filter(item => {
          const isItemIsExpired = moment(item.dueDate, FormatTypes.ISO_FORMAT).startOf('day') < moment().startOf('day');
          return isItemIsExpired && !item.completed;
        }),
      ),
    );
  }
}
