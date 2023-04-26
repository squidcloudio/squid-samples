import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

export interface StockTable {
  type: 'tickers' | 'userAssets';
  data: StockTableData[];
}

export interface StockTableData {
  tickerId: string;
  closePrice: number;
  todaysChange: number;
  todaysChangePerc: number;
  quantity: number;
}

@Component({
  selector: 'stock-table',
  templateUrl: './stock-table.component.html',
  styleUrls: ['./stock-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StockTableComponent {
  @Input()
  tableData!: StockTable;
}
