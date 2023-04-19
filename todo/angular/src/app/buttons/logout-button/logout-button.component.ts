import { Component } from '@angular/core';
import { AccountService } from '../../services/account.service';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-logout-button',
  templateUrl: './logout-button.component.html',
  styleUrls: ['./logout-button.component.scss'],
})
export class LogoutButtonComponent {
  constructor(private accountService: AccountService, readonly themeService: ThemeService) {}
  logout(): void {
    this.accountService.logout();
  }
}
