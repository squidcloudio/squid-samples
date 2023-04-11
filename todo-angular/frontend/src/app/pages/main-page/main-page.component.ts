import { Component } from '@angular/core';
import { AccountService } from '../../services/account.service';

import { TodosService } from '../../services/todos.service';
import { ThemeService } from '../../services/theme.service';
import { Dialog } from '@angular/cdk/dialog';
import { SidebarNavigationComponent } from '../../shared/sidebar-navigation/sidebar-navigation.component';
import { CalendarModalWindowComponent } from '../../shared/calendar-modal-window/calendar-modal-window.component';
import { BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-main',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent {
  readonly userObs = this.accountService.observeUser();
  a = this.br.observe('(max-width: 1199px)');
  constructor(
    private accountService: AccountService,
    readonly todoCollection: TodosService,
    private themeService: ThemeService,
    private dialog: Dialog,
    private br: BreakpointObserver,
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
