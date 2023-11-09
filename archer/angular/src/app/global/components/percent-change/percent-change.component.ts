import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit } from '@angular/core';
import { assertTruthy } from 'assertic';

@Component({
  selector: 'percent-change',
  templateUrl: './percent-change.component.html',
  styleUrls: ['./percent-change.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PercentChangeComponent implements OnInit, OnChanges {
  @Input()
  value!: number;

  ngOnChanges(): void {
    assertTruthy(this.value !== undefined);
  }

  ngOnInit(): void {
    assertTruthy(this.value !== undefined);
  }
}
