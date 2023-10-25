import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ArcherService } from '../global/services/archer.service';
import { TimeFrame, UserAssetWithTicker } from 'archer-common';
import { Chart, LineChartData } from '../global/components/chart/chart.component';
import { BehaviorSubject, switchMap } from 'rxjs';
import { StockTableData } from '../global/components/stock-table/stock-table.component';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PortfolioComponent {
  userAssetsObs = this.archerService.observeUserAssets();
  userObs = this.archerService.observeUser();
  selectedTimeFrameSubject = new BehaviorSubject<TimeFrame>('1d');
  portfolioValueHistoryObs = this.selectedTimeFrameSubject.pipe(
    switchMap((timeFrame) => {
      return this.archerService.getPortfolioValueHistory(timeFrame, 24);
    }),
  );

  constructor(private readonly archerService: ArcherService) {}

  getPortfolioValue(userAssets: UserAssetWithTicker[]): number {
    return userAssets.reduce((acc, userAsset) => {
      return acc + userAsset.holding.quantity * userAsset.ticker.closePrice;
    }, 0);
  }

  getPortfolioChange(userAssets: UserAssetWithTicker[]): number {
    const prevValue = userAssets.reduce((acc, userAsset) => {
      return acc + userAsset.holding.quantity * (userAsset.ticker.closePrice - userAsset.ticker.todaysChange);
    }, 0);

    const currentValue = this.getPortfolioValue(userAssets);
    return parseFloat((((currentValue - prevValue) / prevValue) * 100).toFixed(2));
  }

  getTotalGain(userAssets: Array<UserAssetWithTicker>): number {
    return userAssets.reduce((acc, userAsset) => {
      return (
        acc +
        userAsset.holding.quantity * userAsset.ticker.closePrice -
        userAsset.holding.quantity * userAsset.holding.avgBuyPrice
      );
    }, 0);
  }

  getTotalGainPercent(userAssets: Array<UserAssetWithTicker>): number {
    const totalGain = this.getTotalGain(userAssets);
    return parseFloat(((totalGain / this.getPortfolioValue(userAssets)) * 100).toFixed(2));
  }

  getTotalStockQuantity(userAssets: Array<UserAssetWithTicker>): number {
    return userAssets.reduce((acc, userAsset) => {
      return acc + userAsset.holding.quantity;
    }, 0);
  }

  getAllocationsPerIndustry(userAssets: Array<UserAssetWithTicker>): { percentage: number; sicDescription: string }[] {
    const portfolioValue = this.getPortfolioValue(userAssets);
    if (portfolioValue === 0) return [];
    return userAssets.reduce(
      (acc, userAsset) => {
        const industry = userAsset.ticker.sicDescription || 'General';
        const industryIndex = acc.findIndex((allocation) => allocation.sicDescription === industry);
        if (industryIndex === -1) {
          acc.push({
            sicDescription: industry,
            percentage: ((userAsset.holding.quantity * userAsset.ticker.closePrice) / portfolioValue) * 100,
          });
        } else {
          acc[industryIndex].percentage +=
            ((userAsset.holding.quantity * userAsset.ticker.closePrice) / portfolioValue) * 100;
        }
        return acc;
      },
      [] as { percentage: number; sicDescription: string }[],
    );
  }

  getPortfolioChart(chartData: Array<{ date: Date; value: number }>, gain: boolean): Chart {
    const data: Array<LineChartData> = [
      {
        name: 'Portfolio value',
        series: chartData.map((data) => ({ name: data.date.toISOString(), value: data.value })),
      },
    ];
    return {
      data,
      options: {
        legend: false,
        showXAndYAxis: false,
      },
      summaryData: [
        { label: 'Portfolio value', value: 'Portfolio value', color: `var(${gain ? '--gain1' : '--lose1'})` },
      ],
      type: 'line',
    };
  }

  convertToTableData(userAssets: Array<UserAssetWithTicker>): StockTableData[] {
    return userAssets.map((userAsset) => {
      const ticker = userAsset.ticker;
      return {
        tickerId: ticker.id,
        closePrice: ticker.closePrice,
        todaysChange: ticker.todaysChange,
        todaysChangePerc: ticker.todaysChangePerc,
        quantity: userAsset.holding.quantity,
      };
    });
  }
}
