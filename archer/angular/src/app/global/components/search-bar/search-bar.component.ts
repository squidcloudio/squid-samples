import { ChangeDetectionStrategy, Component, EventEmitter, HostListener, Output } from '@angular/core';
import { ArcherService } from '../../services/archer.service';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { BehaviorSubject, debounceTime, filter, switchMap } from 'rxjs';

@Component({
  selector: 'search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchBarComponent {
  @Output()
  cleared = new EventEmitter<void>();

  searchControl = new FormControl('');
  searchTextSubject = new BehaviorSubject<string>('');
  searchResultsObs = this.searchTextSubject.pipe(
    filter((searchText) => searchText.length > 0),
    debounceTime(50),
    switchMap((searchText) => this.archerService.searchTickers(searchText)),
  );

  constructor(
    private readonly archerService: ArcherService,
    private readonly router: Router,
  ) {}

  async searchStockSelected(): Promise<void> {
    if (!this.searchControl.value) return;
    await this.router.navigateByUrl(`/stock/${this.searchControl.value}`);
    this.clearAndCloseSearch();
  }

  clearAndCloseSearch(): void {
    this.searchControl.setValue(null);
    this.cleared.emit();
  }

  async searchQueryChanged() {
    const searchText = this.searchControl.value;
    this.searchTextSubject.next(searchText || '');
  }

  @HostListener('body:click', ['$event'])
  clickedOut() {
    this.clearAndCloseSearch();
  }
}
