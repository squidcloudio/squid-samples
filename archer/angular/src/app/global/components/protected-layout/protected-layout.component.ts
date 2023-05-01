import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ArcherService } from '../../services/archer.service';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-protected-layout',
  templateUrl: './protected-layout.component.html',
  styleUrls: ['./protected-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProtectedLayoutComponent {
  searchBarVisible = false;
  userObs = this.archerService.observeUser();

  constructor(private readonly archerService: ArcherService, private readonly authService: AuthService) {}

  showSearchBar() {
    this.searchBarVisible = true;
  }

  hideSearchBar() {
    this.searchBarVisible = false;
  }

  signOut() {
    this.authService.logout();
  }
}
