import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ArcherService } from '../global/services/archer.service';
import { ActivatedRoute } from '@angular/router';
import { Ticker, TimeFrame } from 'archer-common';
import { BehaviorSubject, filter, Observable, switchMap } from 'rxjs';
import { Chart, LineChartData } from '../global/components/chart/chart.component';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StockComponent {
  readonly tickerObs: Observable<Ticker> = this.activatedRoute.params.pipe(
    switchMap((params) => this.archerService.observeTicker(params['tickerId'])),
    filter(Boolean),
  );
  selectedTimeFrameSubject = new BehaviorSubject<TimeFrame>('1d');

  constructor(private readonly archerService: ArcherService, private readonly activatedRoute: ActivatedRoute) {}

  getStockChart(stockValueHistory: any, gain: boolean): Chart {
    const data: Array<LineChartData> = [
      {
        name: 'Stock value',
        series: [],
      },
    ];
    return {
      data,
      options: {
        legend: false,
        showXAndYAxis: false,
      },
      summaryData: [{ label: 'Stock value', value: 'Stock value', color: `var(${gain ? '--gain' : '--lose'})` }],
      type: 'line',
    };
  }
}
