import { Injectable } from '@angular/core';
import * as dayjs from 'dayjs';
import { FormatTypes, Task } from '../interfaces';
import { ItemsService } from './items.service';
import { BehaviorSubject, map, Observable, switchMap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CalendarService {
  currentDate = dayjs().format(FormatTypes.DEFAULT_FORMAT);
  dateSubj: BehaviorSubject<string> = new BehaviorSubject(this.currentDate);

  constructor(private itemService: ItemsService) {}

  selectDate(selectedDate: string): void {
    this.currentDate = selectedDate;
    this.dateSubj.next(selectedDate);
  }

  observeItemsOnDate(): Observable<Task[]> {
    return this.dateSubj.pipe(
      switchMap(date => {
        return this.itemService.observeItemsSortedByDate(date).pipe(
          map(items =>
            items.filter(item => {
              const isItemInProgress = dayjs(item.dueDate).diff(dayjs(), 'day');
              return isItemInProgress >= 0 && !item.completed;
            }),
          ),
        );
      }),
    );
  }
}
