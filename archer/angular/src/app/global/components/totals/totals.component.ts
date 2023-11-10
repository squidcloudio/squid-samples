import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit } from '@angular/core';
import { assertTruthy } from 'assertic';

@Component({
  selector: 'totals',
  templateUrl: './totals.component.html',
  styleUrls: ['./totals.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TotalsComponent implements OnInit, OnChanges {
  @Input()
  value!: number;

  @Input()
  changePercent!: number;

  ngOnChanges(): void {
    assertTruthy(this.value !== undefined);
    assertTruthy(this.changePercent !== undefined);
  }

  ngOnInit(): void {
    assertTruthy(this.value !== undefined);
    assertTruthy(this.changePercent !== undefined);
  }
}
