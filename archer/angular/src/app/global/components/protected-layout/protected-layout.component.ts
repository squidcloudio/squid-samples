import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ArcherService } from '../../services/archer.service';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject, debounce, filter, interval, switchMap } from 'rxjs';

@Component({
  selector: 'app-protected-layout',
  templateUrl: './protected-layout.component.html',
  styleUrls: ['./protected-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProtectedLayoutComponent {
  searchBarVisible = false;
  userObs = this.archerService.observeUser();
  userAssetsObs = this.archerService.observeUserAssets();

  constructor(private readonly archerService: ArcherService) {}

  showSearchBar() {
    this.searchBarVisible = true;
  }

  hideSearchBar() {
    this.searchBarVisible = false;
  }
}
