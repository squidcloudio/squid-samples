import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ArcherService } from '../global/services/archer.service';
import { UserAssetWithTicker } from 'archer-common';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PortfolioComponent {
  userAssetsObs = this.archerService.observeUserAssets();
  userObs = this.archerService.observeUser();

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
}
