import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ArcherService } from '../global/services/archer.service';
import { UserAsset, UserAssetWithTicker } from 'archer-common';

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

  getPortfolioValue(userAssets: UserAssetWithTicker[]) {
    return userAssets.reduce((acc, userAsset) => {
      return acc + userAsset.quantity * userAsset.ticker.closePrice;
    }, 0);
  }
}
