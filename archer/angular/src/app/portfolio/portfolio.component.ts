import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ArcherService } from '../global/services/archer.service';
import { allTimeRanges, TimeRange, UserAssetWithTicker } from 'archer-common';
import { Chart, LineChartData } from '../global/components/chart/chart.component';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PortfolioComponent {
  userAssetsObs = this.archerService.observeUserAssets();
  userObs = this.archerService.observeUser();
  allTimeRanges = allTimeRanges;
  selectedTimeRange: TimeRange = '1d';

  sampleData: Array<{ date: Date; value: number }> = [
    { date: new Date('2020-12-31'), value: 0 },
    { date: new Date('2021-01-01'), value: 100 },
    { date: new Date('2021-01-02'), value: 200 },
    { date: new Date('2021-01-03'), value: 300 },
    { date: new Date('2021-01-04'), value: 400 },
    { date: new Date('2021-01-05'), value: 500 },
    { date: new Date('2021-01-06'), value: 600 },
    { date: new Date('2021-01-07'), value: 500 },
    { date: new Date('2021-01-08'), value: 400 },
    { date: new Date('2021-01-09'), value: 500 },
    { date: new Date('2021-01-10'), value: 600 },
  ];

  constructor(private readonly archerService: ArcherService) {}

  getPortfolioValue(userAssets: UserAssetWithTicker[]): number {
    return userAssets.reduce((acc, userAsset) => {
      return acc + userAsset.quantity * userAsset.ticker.closePrice;
    }, 0);
  }

  getPortfolioChange(userAssets: UserAssetWithTicker[]): number {
    const prevValue = userAssets.reduce((acc, userAsset) => {
      return acc + userAsset.quantity * (userAsset.ticker.closePrice - userAsset.ticker.todaysChange);
    }, 0);

    const currentValue = this.getPortfolioValue(userAssets);
    return parseFloat((((currentValue - prevValue) / prevValue) * 100).toFixed(2));
  }

  getTotalGain(userAssets: Array<UserAssetWithTicker>): number {
    return userAssets.reduce((acc, userAsset) => {
      return acc + userAsset.quantity * userAsset.ticker.closePrice - userAsset.quantity * userAsset.avgBuyPrice;
    }, 0);
  }

  getTotalGainPercent(userAssets: Array<UserAssetWithTicker>): number {
    const totalGain = this.getTotalGain(userAssets);
    return parseFloat(((totalGain / this.getPortfolioValue(userAssets)) * 100).toFixed(2));
  }

  getTotalStockQuantity(userAssets: Array<UserAssetWithTicker>): number {
    return userAssets.reduce((acc, userAsset) => {
      return acc + userAsset.quantity;
    }, 0);
  }

  getAllocationsPerIndustry(userAssets: Array<UserAssetWithTicker>): { percentage: number; sicDescription: string }[] {
    const portfolioValue = this.getPortfolioValue(userAssets);
    if (portfolioValue === 0) return [];
    return userAssets.reduce((acc, userAsset) => {
      const industry = userAsset.ticker.sicDescription || 'General';
      const industryIndex = acc.findIndex((allocation) => allocation.sicDescription === industry);
      if (industryIndex === -1) {
        acc.push({
          sicDescription: industry,
          percentage: ((userAsset.quantity * userAsset.ticker.closePrice) / portfolioValue) * 100,
        });
      } else {
        acc[industryIndex].percentage += ((userAsset.quantity * userAsset.ticker.closePrice) / portfolioValue) * 100;
      }
      return acc;
    }, [] as { percentage: number; sicDescription: string }[]);
  }

  getPortfolioChart(chartData: Array<{ date: Date; value: number }>): Chart {
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
      summaryData: [{ label: 'Portfolio value', value: 'Portfolio value', color: 'var(--gain)' }],
      type: 'line',
    };
  }
}
