import { Component } from '@angular/core';
import { AccountService } from '../../services/account.service';

import { TodosService } from '../../services/todos.service';
import { ThemeService } from '../../services/theme.service';
import { Dialog } from '@angular/cdk/dialog';
import { SidebarNavigationComponent } from '../../shared/sidebar-navigation/sidebar-navigation.component';

@Component({
  selector: 'app-main',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent {
  readonly userObs = this.accountService.observeUser();

  constructor(
    private accountService: AccountService,
    readonly todoCollection: TodosService,
    private themeService: ThemeService,
    private dialog: Dialog,
  ) {}

  a(): void {
    this.themeService.toggleTheme();
  }

  logout(): void {
    this.accountService.logout();
  }
  openModalWindow(): void {
    const dialogRef = this.dialog.open(SidebarNavigationComponent);
    dialogRef.closed.subscribe();
  }
}
