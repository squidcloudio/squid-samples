import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ArcherService } from '../global/services/archer.service';
import { ActivatedRoute } from '@angular/router';
import {
  AggregationsBarResponse,
  convertTimeFrameToMilliseconds,
  convertTimeFrameToTimeSpan,
  Ticker,
  TimeFrame,
} from 'archer-common';
import { BehaviorSubject, distinctUntilChanged, filter, from, map, Observable, switchMap, timer } from 'rxjs';
import { Chart, LineChartData } from '../global/components/chart/chart.component';
import { Squid } from '@squidcloud/client';
import * as dayjs from 'dayjs';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { BuyOrSellStockDialogComponent } from './buy-or-sell-stock-dialog/buy-or-sell-stock-dialog.component';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StockComponent {
  selectedTimeFrameSubject = new BehaviorSubject<TimeFrame>('1d');

  readonly tickerIdObs: Observable<string> = this.activatedRoute.params.pipe(
    map((params) => params['tickerId']),
    filter(Boolean),
    distinctUntilChanged(),
  );

  readonly tickerObs: Observable<Ticker> = this.tickerIdObs.pipe(
    switchMap((tickerId) => this.archerService.observeTicker(tickerId)),
    filter(Boolean),
  );

  readonly userAssetObs = this.tickerIdObs.pipe(switchMap((tickerId) => this.archerService.observeUserAsset(tickerId)));
  readonly userAssetsObs = this.archerService.observeUserAssets();

  readonly chartObs: Observable<Chart> = timer(0, 10000).pipe(
    switchMap(() => this.selectedTimeFrameSubject),
    switchMap((timeFrame) => {
      const toDate = Date.now();
      const fromDate = toDate - convertTimeFrameToMilliseconds(timeFrame);

      return this.tickerObs.pipe(
        switchMap((ticker) => {
          return from(
            this.squid.callApi<AggregationsBarResponse>('polygon', 'aggregatesBar', {
              from: dayjs(fromDate).format('YYYY-MM-DD'),
              to: dayjs(toDate).format('YYYY-MM-DD'),
              stocksTicker: ticker.id,
              multiplier: 1,
              timespan: convertTimeFrameToTimeSpan(timeFrame),
            }),
          ).pipe(
            map((response) => {
              const data: Array<LineChartData> = [
                {
                  name: 'Stock value',
                  series: (response.results || []).map((result) => ({
                    name: new Date(result.t).toISOString(),
                    value: result.c,
                  })),
                },
              ];
              const chart: Chart = {
                data,
                options: {
                  legend: false,
                  showXAndYAxis: false,
                },
                summaryData: [
                  {
                    label: 'Stock value',
                    value: 'Stock value',
                    color: `var(${ticker.todaysChangePerc >= 0 ? '--gain1' : '--lose1'})`,
                  },
                ],
                type: 'line',
              };
              return chart;
            }),
          );
        }),
      );
    }),
  );

  constructor(
    private readonly archerService: ArcherService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly squid: Squid,
    private readonly dialog: MatDialog,
  ) {}

  showBuyOrSellDialog(ticker: Ticker, buy: boolean): void {
    const config: MatDialogConfig = {
      maxWidth: '345px',
      width: '100%',
      autoFocus: true,
      restoreFocus: false,
      panelClass: 'modal',
      data: { buy, ticker },
    };
    this.dialog.open(BuyOrSellStockDialogComponent, config);
  }
}
