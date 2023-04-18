import { Component } from '@angular/core';
import { DialogRef } from '@angular/cdk/dialog';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-calendar-window',
  templateUrl: 'calendar-modal-window.component.html',
  styleUrls: ['calendar-modal-window.component.scss'],
})
export class CalendarModalWindowComponent {
  constructor(readonly dialogRef: DialogRef<string>, readonly themeService: ThemeService) {}
}
