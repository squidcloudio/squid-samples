import { Component } from '@angular/core';
import { AccountService } from '../../services/account.service';

import { TodosService } from '../../services/todos.service';

@Component({
  selector: 'app-main',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent {
  readonly userObs = this.accountService.observeUser();

  constructor(private accountService: AccountService, public todoCollection: TodosService) {}

  logout(): void {
    this.accountService.logout();
  }
}
