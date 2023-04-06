import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { FormatTypes, Item } from '../interfaces';
import { ItemsService } from './items.service';
import { BehaviorSubject, map, Observable, switchMap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CalendarService {
  constructor(private itemService: ItemsService) {}
  currentDate = moment().format(FormatTypes.DEFAULT_FORMAT);
  dateSubj: BehaviorSubject<string> = new BehaviorSubject(this.currentDate);

  selectDate(selectedDate: string): void {
    this.currentDate = selectedDate;
    this.dateSubj.next(selectedDate);
  }
  getItemsByDate(date: string): Observable<Item[]> {
    return this.dateSubj.asObservable().pipe(
      switchMap(date => {
        return this.itemService.getItemByDate(date).pipe(
          map(items =>
            items.filter(item => {
              const isItemInProgress = moment(item.dueDate, FormatTypes.ISO_FORMAT)
                .startOf('day')
                .diff(moment().startOf('day'));
              return isItemInProgress >= 0 && !item.completed;
            }),
          ),
        );
      }),
    );
  }
}
