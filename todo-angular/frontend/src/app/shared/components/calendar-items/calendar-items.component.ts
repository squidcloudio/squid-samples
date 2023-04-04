import { Component, Input, OnInit } from '@angular/core';
import { FormatTypes, Item } from '../../../interfaces';
import * as moment from 'moment/moment';
import { Router } from '@angular/router';
import { CalendarService } from '../../../services/calendar.service';
import { Observable } from 'rxjs';
import { ThemeService } from '../../../services/theme.service';

@Component({
  selector: 'app-calendar-items',
  templateUrl: 'calendar-items.component.html',
  styleUrls: ['calendar-items.component.scss'],
})
export class CalendarItemsComponent implements OnInit {
  activeItemsObs?: Observable<Item[]>;
  readonly formatTypes = FormatTypes;
  constructor(private router: Router, readonly calendarService: CalendarService, readonly themeService: ThemeService) {}
  ngOnInit(): void {
    this.activeItemsObs = this.calendarService.getItemsByDate(this.calendarService.currentDate);
  }

  goToTodoPage(todoId: string, itemId: string, dueDate?: string): void {
    const today = moment().format(FormatTypes.DEFAULT_FORMAT);
    const tomorrow = moment().add(1, 'day').format(FormatTypes.DEFAULT_FORMAT);
    const navigationId = dueDate === today ? 'today' : dueDate === tomorrow ? 'tomorrow' : 'someday';
    this.router.navigate(['', todoId ? todoId : navigationId], { queryParams: { itemId: itemId } });
  }
}
