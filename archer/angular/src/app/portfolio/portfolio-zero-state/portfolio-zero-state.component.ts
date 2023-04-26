import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ArcherService } from '../../global/services/archer.service';
import { Ticker } from 'archer-common';
import { StockTableData } from '../../global/components/stock-table/stock-table.component';

@Component({
  selector: 'portfolio-zero-state',
  templateUrl: './portfolio-zero-state.component.html',
  styleUrls: ['./portfolio-zero-state.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PortfolioZeroStateComponent {
  private readonly promotedTickerIds = ['AAPL', 'MSFT', 'NFLX', 'JPM', 'AMZN', 'DIS', 'META', 'TSLA'];
  promotedTickersObs = this.archerService.observeTickers(this.promotedTickerIds);
  gainersAndLosersObs = this.archerService.observeGainersAndLosers();

  constructor(private readonly archerService: ArcherService) {}

  convertToTableData(gainersAndLosers: Ticker[]): StockTableData[] {
    return gainersAndLosers
      .map((ticker) => {
        return {
          tickerId: ticker.id,
          closePrice: ticker.closePrice,
          todaysChange: ticker.todaysChange,
          todaysChangePerc: ticker.todaysChangePerc,
          quantity: 0,
        };
      })
      .sort((a, b) => {
        return b.todaysChangePerc - a.todaysChangePerc;
      });
  }
}
