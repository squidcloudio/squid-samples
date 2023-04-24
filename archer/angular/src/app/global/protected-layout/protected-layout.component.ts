import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ArcherService } from '../services/archer.service';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject, debounce, interval, switchMap } from 'rxjs';

@Component({
  selector: 'app-protected-layout',
  templateUrl: './protected-layout.component.html',
  styleUrls: ['./protected-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProtectedLayoutComponent {
  searchControl = new FormControl('');
  searchTextSubject = new BehaviorSubject<string>('');
  searchResultsObs = this.searchTextSubject.pipe(
    debounce(() => interval(50)),
    switchMap((searchText) => this.archerService.searchTickers(searchText)),
  );

  constructor(private readonly archerService: ArcherService, private readonly router: Router) {}

  async searchStockSelected(): Promise<void> {
    if (!this.searchControl.value) return;
    await this.router.navigateByUrl(`/stock/${this.searchControl.value}`);
    this.searchControl.setValue(null);
  }

  async searchQueryChanged() {
    const searchText = this.searchControl.value;
    this.searchTextSubject.next(searchText || '');
  }
}
