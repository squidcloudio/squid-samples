import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import * as dayjs from 'dayjs';
import { FormatTypes } from '../../../interfaces';
import { CalendarService } from '../../../services/calendar.service';
import { ThemeService } from '../../../services/theme.service';
import { Dayjs } from 'dayjs';

@Component({
  selector: 'app-calendar-picker',
  templateUrl: 'calendar-picker.component.html',
  styleUrls: ['calendar-picker.component.scss'],
})
export class CalendarPickerComponent implements OnInit, OnDestroy {
  selectedDate: string = this.calendarService.currentDate;
  readonly formatTypes = FormatTypes;
  readonly calendarSubj: BehaviorSubject<Dayjs> = new BehaviorSubject(dayjs());
  readonly calendarList: string[] = [];
  constructor(private calendarService: CalendarService, readonly themeService: ThemeService) {}
  ngOnInit(): void {
    this.calendarSubj
      .asObservable()
      .pipe(
        map(currentDate => {
          this.selectedDate = currentDate.format(FormatTypes.DEFAULT_FORMAT);
          return dayjs(currentDate).startOf('week');
        }),
      )
      .subscribe(currentDate => {
        this.calendarList.length = 0;
        for (let i = 0; i <= 6; i++) {
          const date = dayjs(currentDate).add(i, 'day');
          this.calendarList.push(date.format(FormatTypes.DEFAULT_FORMAT));
        }
      });
  }
  getPrevWeek(): void {
    this.calendarSubj.next(dayjs(this.calendarSubj.value).subtract(7, 'day'));
  }

  getNextWeek(): void {
    this.calendarSubj.next(dayjs(this.calendarSubj.value).add(7, 'day'));
  }
  selectDate(selectedDate: string): void {
    this.calendarService.selectDate(selectedDate);
    this.selectedDate = this.calendarService.currentDate;
  }

  ngOnDestroy(): void {
    this.calendarSubj.unsubscribe();
  }
}
