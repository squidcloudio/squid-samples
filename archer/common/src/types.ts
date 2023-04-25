export interface Ticker {
  id: string;
  name: string;
  description: string;
  homepageUrl: string;
  listDate: string;
  marketCap: number;
  exchange: string;
  phoneNumber: string;
  closePrice: number;
  openPrice: number;
  todaysChange: number;
  todaysChangePerc: number;
  sicCode: number;
  sicDescription: string;
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

export type UserAssetWithTicker = UserAsset & { ticker: Ticker };

export interface PortfolioValueHistory {
  userId: string;
  value: number;
  date: Date;
}

export interface ArcherUser {
  id: string;
  email: string;
  emailVerified: boolean;
  name: string;
  picture: string | undefined;
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

export interface MinuteSnapshotTickerDay extends SnapshotTickerDay {
  av: number;
}

export interface SnapshotTicker {
  day: SnapshotTickerDay;
  prevDay: SnapshotTickerDay;
  min: MinuteSnapshotTickerDay;
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
