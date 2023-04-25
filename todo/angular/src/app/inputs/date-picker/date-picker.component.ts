import { Component, Input, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ThemeService } from '../../services/theme.service';
import { MatDatepicker } from '@angular/material/datepicker';

@Component({
  selector: 'app-date-picker',
  templateUrl: 'date-picker.component.html',
  styleUrls: ['date-picker.component.scss'],
})
export class DatePickerComponent {
  @ViewChild('picker') picker?: MatDatepicker<any>;
  @Input('control') control?: FormGroup;
  @Input('itemId') itemId?: string;
  constructor(readonly themeService: ThemeService) {}

  openCalendar(): void {
    this.picker?.open();
  }
  closeCalendar(): void {
    this.picker?.close();
  }
}
