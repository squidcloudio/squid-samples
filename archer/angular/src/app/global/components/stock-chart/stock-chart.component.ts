import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Chart } from '../chart/chart.component';
import { TimeFrame } from 'archer-common';

@Component({
  selector: 'stock-chart',
  templateUrl: './stock-chart.component.html',
  styleUrls: ['./stock-chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StockChartComponent {
  @Input()
  chart!: Chart;

  @Input()
  gain!: boolean;

  @Input()
  selectedTimeFrame!: TimeFrame;

  @Output()
  timeFrameSelected = new EventEmitter<TimeFrame>();
}
