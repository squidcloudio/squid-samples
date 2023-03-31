import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import * as moment from 'moment';
import { Moment } from 'moment';
import { Item } from '../../interfaces';
import { ItemsService } from '../../services/items.service';
import { Router } from '@angular/router';
import { FormatTypes } from '../../interfaces';

@Component({
  selector: 'app-calendar-sidebar',
  templateUrl: './calendar-sidebar.component.html',
  styleUrls: ['./calendar-sidebar.component.scss'],
})
export class CalendarSidebarComponent implements OnInit, OnDestroy {
  selectedDate: string = moment().format(FormatTypes.DEFAULT_FORMAT);
  activeItemsObs?: Observable<Item[]>;
  expiredItemsObs?: Observable<Item[]>;
  readonly formatTypes = FormatTypes;
  readonly calendarSubj: BehaviorSubject<Moment> = new BehaviorSubject(moment());
  readonly calendarList: string[] = [];
  constructor(private itemService: ItemsService, private router: Router) {}
  ngOnInit(): void {
    this.calendarSubj
      .asObservable()
      .pipe(
        map(currentDate => {
          this.selectedDate = currentDate.format(FormatTypes.DEFAULT_FORMAT);
          return moment(currentDate).startOf('week');
        }),
      )
      .subscribe(currentDate => {
        this.calendarList.length = 0;
        for (let i = 0; i <= 6; i++) {
          const date = moment(currentDate).add(i, 'day');
          this.calendarList.push(date.format(FormatTypes.DEFAULT_FORMAT));
        }
      });
    this.activeItemsObs = this.getItemByDate();
    this.expiredItemsObs = this.itemService.getItems().pipe(
      map(items =>
        items.filter(item => {
          const isItemIsExpired = moment(item.dueDate).startOf('day') < moment().startOf('day');
          return isItemIsExpired && !item.completed;
        }),
      ),
    );
  }
  getPrevWeek(): void {
    this.calendarSubj.next(moment(this.calendarSubj.value).subtract(7, 'day'));
  }

  getNextWeek(): void {
    this.calendarSubj.next(moment(this.calendarSubj.value).add(7, 'day'));
  }
  selectDate(selectedDate: string): void {
    this.selectedDate = selectedDate;
    this.activeItemsObs = this.getItemByDate();
  }
  ngOnDestroy(): void {
    this.calendarSubj.unsubscribe();
  }
  goToTodoPage(todoId: string, itemId: string, dueDate?: string): void {
    const today = moment().format(FormatTypes.DEFAULT_FORMAT);
    const tomorrow = moment().add(1, 'day').format(FormatTypes.DEFAULT_FORMAT);
    const navigationId = dueDate === today ? 'today' : dueDate === tomorrow ? 'tomorrow' : 'someday';
    this.router.navigate(['', todoId ? todoId : navigationId], { queryParams: { itemId: itemId } });
  }
  getItemByDate(): Observable<Item[]> {
    return this.itemService.getItemByDate(this.selectedDate).pipe(
      map(items =>
        items.filter(item => {
          const isItemInProgress = moment(item.dueDate).startOf('day').diff(moment().startOf('day'));
          return isItemInProgress >= 0 && !item.completed;
        }),
      ),
    );
  }
}
