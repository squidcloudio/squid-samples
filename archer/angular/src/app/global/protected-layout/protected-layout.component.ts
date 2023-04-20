import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ArcherService } from '../services/archer.service';
import { Ticker } from 'archer-common';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-protected-layout',
  templateUrl: './protected-layout.component.html',
  styleUrls: ['./protected-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProtectedLayoutComponent {
  searchControl = new FormControl('');

  readonly tickersObs = this.archerService.observeTickers();

  constructor(private readonly archerService: ArcherService) {}

  searchText: string = '';

  filterTickers(tickers: Ticker[], searchText: string) {
    return tickers.filter((ticker) => {
      return (
        ticker.id.toLowerCase().includes(searchText.toLowerCase()) ||
        ticker.name.toLowerCase().includes(searchText.toLowerCase())
      );
    });
  }
}
