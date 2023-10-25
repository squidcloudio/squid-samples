import { Component } from '@angular/core';
import { AccountService } from '../../services/account.service';

import { ListService } from '../../services/list.service';
import { ThemeService } from '../../services/theme.service';
import { Dialog } from '@angular/cdk/dialog';
import { SidebarNavigationComponent } from '../../sidebar-navigation/sidebar-navigation.component';
import { CalendarModalWindowComponent } from '../../calendar-modal-window/calendar-modal-window.component';
import { BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-main',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent {
  readonly userObs = this.accountService.observeUser();
  breakpoint = this.breakpointObs.observe('(max-width: 1247px)');
  constructor(
    private accountService: AccountService,
    readonly listCollection: ListService,
    private themeService: ThemeService,
    private dialog: Dialog,
    private breakpointObs: BreakpointObserver,
  ) {}

  openModalWindow(): void {
    const dialogRef = this.dialog.open(SidebarNavigationComponent);
    dialogRef.closed.subscribe();
  }
  openCalendar(): void {
    const dialogRef = this.dialog.open(CalendarModalWindowComponent);
    dialogRef.closed.subscribe();
  }
}
