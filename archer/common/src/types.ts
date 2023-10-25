export type TimeFrame = '1d' | '1w' | '1m' | '3m' | '1y';
export type TimeSpan = 'minute' | 'hour' | 'day' | 'week' | 'month' | 'quarter' | 'year';
export const allTimeFrames: Array<TimeFrame> = ['1d', '1w', '1m', '3m', '1y'];

export function convertTimeFrameToMilliseconds(timeFrame: TimeFrame) {
  switch (timeFrame) {
    case '1d':
      // noinspection PointlessArithmeticExpressionJS
      return 1 * 24 * 60 * 60 * 1000;
    case '1w':
      return 7 * 24 * 60 * 60 * 1000;
    case '1m':
      return 30 * 24 * 60 * 60 * 1000;
    case '3m':
      return 90 * 24 * 60 * 60 * 1000;
    case '1y':
      return 365 * 24 * 60 * 60 * 1000;
  }
}

export function convertTimeFrameToTimeSpan(timeFrame: TimeFrame): TimeSpan {
  switch (timeFrame) {
    case '1d':
      return 'hour';
    case '1w':
      return 'hour';
    case '1m':
      return 'day';
    case '3m':
      return 'day';
    case '1y':
      return 'week';
  }
}

export interface Ticker {
  id: string;
  name: string;
  description: string;
  homepageUrl: string;
  listDate: string;
  marketCap: number;
  exchange: string;
  phoneNumber: string;
  volume: number;
  volumeWeighted: number;
  closePrice: number;
  openPrice: number;
  prevDayClosePrice: number;
  prevDayOpenPrice: number;
  todaysChange: number;
  todaysChangePerc: number;
  sicCode: number;
  sicDescription: string;
  totalEmployees: number;
  address?: {
    address1: string;
    address2?: string;
    city: string;
    postal_code: string;
    state: string;
  };
}

export interface UserAsset {
  userId: string;
  tickerId: string;
  quantity: number;
  avgBuyPrice: number;
}

export type UserAssetWithTicker = { holding: UserAsset; ticker: Ticker };

export interface PortfolioValueHistory {
  userId: string;
  value: number;
  date: Date;
}

export interface RelevantTicker {
  id: string;
}

export interface ArcherUser {
  id: string;
  email: string;
  emailVerified: boolean;
  name: string;
  picture?: string;
  balance: number;
}

/** Polygon */
export interface GeneralPolygonResponse {
  status: string;
}

export interface SnapshotTickerDay {
  c: number;
  h: number;
  l: number;
  o: number;
  v: number;
  vw: number;
}
export interface SnapshotTrade {
  c: number[];
  i: string;
  p: number;
  s: number;
  t: number;
  x: number;
}
export interface SnapshotQuote {
  P: number;
  S: number;
  p: number;
  s: number;
  t: number;
}

export interface MinuteSnapshotTickerDay extends SnapshotTickerDay {
  av: number;
}

export interface SnapshotTicker {
  day: SnapshotTickerDay;
  prevDay: SnapshotTickerDay;
  min: MinuteSnapshotTickerDay;
  lastTrade: SnapshotTrade;
  lastQuote: SnapshotQuote;
  ticker: string;
  todaysChange: number;
  todaysChangePerc: number;
  updated: number;
}

export interface SnapshotsResponse extends GeneralPolygonResponse {
  tickers: Array<SnapshotTicker>;
}

export interface TickerDetailsResults {
  active: boolean;
  address?: {
    address1: string;
    address2: string;
    city: string;
    postal_code: string;
    state: string;
  };
  branding: {
    icon_url: string;
    logo_url: string;
  };
  cik: string;
  composite_figi: string;
  currency_name: string;
  description: string;
  homepage_url: string;
  list_date: string;
  locale: string;
  market: string;
  market_cap: number;
  name: string;
  phone_number: string;
  primary_exchange: string;
  round_lot: number;
  share_class_figi: string;
  share_class_shares_outstanding: number;
  sic_code: number;
  sic_description: string;
  ticker: string;
  ticker_root: string;
  total_employees: number;
  type: string;
  weighted_shares_outstanding: number;
}

export interface TickerDetailsResponse extends GeneralPolygonResponse {
  results: TickerDetailsResults;
}

export interface AggregationsBarResponse extends GeneralPolygonResponse {
  results: Array<AggregationBarResult>;
}

export interface AggregationBarResult {
  c: number;
  h: number;
  l: number;
  n: number;
  o: number;
  t: number;
  v: number;
  vw: number;
}

export type MarketExchangeStatus = 'extended-hours' | 'closed' | 'open';

export interface MarketStatusResponse {
  afterHours: boolean;
  earlyHours: boolean;
  exchanges: {
    nasdaq: MarketExchangeStatus;
    nyse: MarketExchangeStatus;
    otc: MarketExchangeStatus;
  };
  market: MarketExchangeStatus;
}

export interface DenyList {
  tickerId: string;
}

export interface TickerResults {
  active: boolean;
  cik: string;
  composite_figi: string;
  currency_name: string;
  last_updated_utc: string;
  locale: string;
  market: string;
  name: string;
  primary_exchange: string;
  share_class_figi: string;
  ticker: string;
  type: string;
}

export interface TickersResponse extends GeneralPolygonResponse {
  results: Array<TickerResults>;
}
