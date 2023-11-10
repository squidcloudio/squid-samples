import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit } from '@angular/core';
import { assertTruthy } from 'assertic';
import { Color } from '@swimlane/ngx-charts';

export type Chart = LineChart;
export type ChartType = 'line';
export type IsoDateString = string;

interface BaseChart {
  type: ChartType;
  summaryData: Array<SummaryData>;
}

interface SummaryData {
  label: string;
  value: string;
  color: string;
  description?: string;
}

export interface LineChartSeriesData {
  name: string;
  value: IsoDateString | number;
  min?: number;
  max?: number;
}

export interface LineChartData {
  name: string;
  series: Array<LineChartSeriesData>;
}

export interface LineChartOptions {
  showXAndYAxis: boolean;
  legend: boolean;
  xAxisTicks?: Array<any>;
  yAxisTicks?: Array<any>;
}

export interface LineChart extends BaseChart {
  type: 'line';
  data: Array<LineChartData>;
  options: LineChartOptions;
}

@Component({
  selector: 'chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChartComponent implements OnChanges, OnInit {
  @Input()
  chart!: Chart;
  undefAsAny: any = undefined;

  ngOnChanges(): void {
    assertTruthy(this.chart);
  }

  ngOnInit(): void {
    assertTruthy(this.chart);
  }

  getColorScheme(chart: Chart): Color {
    return {
      name: 'custom',
      group: 'linear' as any,
      selectable: false,
      domain: chart.summaryData.map((s) => s.color),
    };
  }
}
