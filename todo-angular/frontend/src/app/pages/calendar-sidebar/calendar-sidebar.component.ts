import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import * as moment from 'moment';
import { Moment } from 'moment';
import { CalendarList } from '../../interfaces';

@Component({
  selector: 'app-calendar-sidebar',
  templateUrl: './calendar-sidebar.component.html',
  styleUrls: ['./calendar-sidebar.component.scss'],
})
export class CalendarSidebarComponent implements OnInit, OnDestroy {
  selectedDate: string = moment().format('M/D/YYYY');
  selectedMonth: string = moment(this.selectedDate).format('MMMM YYYY');
  calendarSubj: BehaviorSubject<Moment> = new BehaviorSubject(moment());
  calendarList: CalendarList[] = [];
  ngOnInit(): void {
    this.calendarSubj
      .asObservable()
      .pipe(
        map(currentDate => {
          this.selectedDate = currentDate.format('M/D/YYYY');
          this.selectedMonth = currentDate.format('MMMM YYYY');
          console.log(this.selectedMonth);
          return moment(currentDate).startOf('week');
        }),
      )
      .subscribe(currentDate => {
        this.calendarList = [];
        for (let i = 0; i <= 6; i++) {
          const date = moment(currentDate).add(i, 'day');
          this.calendarList.push({ date: date, weekDayNumber: date.format('D'), weekdayName: date.format('dd') });
        }
      });
  }
  getPrevDate(): void {
    this.calendarSubj.next(moment(this.calendarSubj.value).subtract(7, 'day'));
  }

  getNextDate(): void {
    this.calendarSubj.next(moment(this.calendarSubj.value).add(7, 'day'));
  }

  ngOnDestroy(): void {
    this.calendarSubj.unsubscribe();
  }
}
