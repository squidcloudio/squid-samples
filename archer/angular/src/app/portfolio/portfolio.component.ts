import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ArcherService } from '../global/services/archer.service';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PortfolioComponent {
  assetsObs = this.archerService.observeAssets();

  constructor(private readonly archerService: ArcherService) {}
}
