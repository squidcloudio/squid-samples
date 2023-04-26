import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { allTimeFrames, TimeFrame } from 'archer-common';

@Component({
  selector: 'chart-controls',
  templateUrl: './chart-controls.component.html',
  styleUrls: ['./chart-controls.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChartControlsComponent {
  allTimeFrames = allTimeFrames;
  @Input()
  selectedTimeFrame: TimeFrame = '1d';

  @Input()
  gain!: boolean;

  @Output()
  timeFrameSelected = new EventEmitter<TimeFrame>();
}
