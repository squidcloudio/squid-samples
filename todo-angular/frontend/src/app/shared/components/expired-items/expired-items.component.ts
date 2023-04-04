import { Component, Input, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { FormatTypes, Item } from '../../../interfaces';
import { ItemsService } from '../../../services/items.service';
import { ThemeService } from '../../../services/theme.service';
import * as moment from 'moment/moment';
import { Router } from '@angular/router';
import { DialogRef } from '@angular/cdk/dialog';

@Component({
  selector: 'app-expired-items',
  templateUrl: 'expired-items.component.html',
  styleUrls: ['expired-items.component.scss'],
})
export class ExpiredItemsComponent implements OnInit {
  @Input('dialog') dialog?: DialogRef<string>;
  expiredItemsObs?: Observable<Item[]>;
  constructor(private itemService: ItemsService, readonly themeService: ThemeService, private router: Router) {}
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
  gotToPage(id: string): void {
    this.router.navigate(['', 'someday'], { queryParams: { itemId: id } });
    this.dialog?.close();
  }
}
