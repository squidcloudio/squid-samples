export interface PortfolioItem {
  tickerId: string;
  amount: number;
  currentPrice: number;
  sector: string;
  changeFromYesterdayPercent: number;
  changeFromYesterdayPrice: number;
}
