import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ArcherService } from '../services/archer.service';
import { Ticker } from 'archer-common';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-protected-layout',
  templateUrl: './protected-layout.component.html',
  styleUrls: ['./protected-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProtectedLayoutComponent {
  searchControl = new FormControl('');

  readonly tickersObs = this.archerService.observeTickers();

  constructor(private readonly archerService: ArcherService, private readonly router: Router) {}

  filterTickers(tickers: Ticker[], searchText: string) {
    return tickers.filter((ticker) => {
      return (
        ticker.id.toLowerCase().includes(searchText.toLowerCase()) ||
        ticker.name.toLowerCase().includes(searchText.toLowerCase())
      );
    });
  }

  async searchStockSelected(): Promise<void> {
    if (!this.searchControl.value) return;
    await this.router.navigateByUrl(`/stock/${this.searchControl.value}`);
    this.searchControl.setValue(null);
  }
}
