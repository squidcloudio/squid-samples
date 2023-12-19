export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export type BuiltInTicker = PartialBy<
  Ticker,
  'closePrice' | 'prevDayClosePrice' | 'changeFromPrevClosePercent' | 'changeFromPrevClosePrice' | 'updateDate'
>;

export const ALL_TICKERS: Array<BuiltInTicker> = [
  {
    id: 'PG',
    name: 'Procter & Gamble Co',
    sector: 'Soap, Detergents, Cleang Preparations, Perfumes, Cosmetics',
  },
  {
    id: 'NKE',
    name: 'Nike Inc',
    sector: 'Rubber & Plastics Footwear',
  },
  {
    id: 'AXP',
    name: 'American Express Co',
    sector: 'Finance Services',
  },
  {
    id: 'BA',
    name: 'Boeing Co',
    sector: 'Aircraft',
  },
  {
    id: 'DIS',
    name: 'Walt Disney Co',
    sector: 'Services-miscellaneous Amusement & Recreation',
  },
  {
    id: 'CVX',
    name: 'Chevron Corp',
    sector: 'Petroleum Refining',
  },
  {
    id: 'KO',
    name: 'Coca-Cola Co',
    sector: 'Beverages',
  },
  {
    id: 'AAPL',
    name: 'Apple Inc',
    sector: 'Electronic Computers',
  },
  {
    id: 'AMGN',
    name: 'Amgen Inc',
    sector: 'Biological Products, (no Disgnostic Substances)',
  },
  {
    id: 'WBA',
    name: 'Walgreens Boots Alliance Inc',
    sector: 'Retail-drug Stores And Proprietary Stores',
  },
  {
    id: 'INTC',
    name: 'Intel Corp',
    sector: 'Semiconductors & Related Devices',
  },
  {
    id: 'CAT',
    name: 'Caterpillar Inc',
    sector: 'Construction Machinery & Equip',
  },
  {
    id: 'HON',
    name: 'Honeywell International Inc',
    sector: 'Aircraft Engines & Engine Parts',
  },
  {
    id: 'CRM',
    name: 'Salesforce Inc',
    sector: 'Services-prepackaged Software',
  },
  {
    id: 'GS',
    name: 'Goldman Sachs Group Inc',
    sector: 'Security Brokers, Dealers & Flotation Companies',
  },
  {
    id: 'MRK',
    name: 'Merck & Co Inc',
    sector: 'Pharmaceutical Preparations',
  },
  {
    id: 'CSCO',
    name: 'Cisco Systems Inc',
    sector: 'Computer Communications Equipment',
  },
  {
    id: 'MMM',
    name: '3M Co',
    sector: 'Surgical & Medical Instruments & Apparatus',
  },
  {
    id: 'JPM',
    name: 'JPMorgan Chase & Co',
    sector: 'National Commercial Banks',
  },
  {
    id: 'DOW',
    name: 'Dow Inc',
    sector: 'Plastic Materials, Synth Resins & Nonvulcan Elastomers',
  },
  {
    id: 'VZ',
    name: 'Verizon Communications Inc',
    sector: 'Telephone Communications (no Radiotelephone)',
  },
  {
    id: 'MSFT',
    name: 'Microsoft Corp',
    sector: 'Services-prepackaged Software',
  },
  {
    id: 'IBM',
    name: 'International Business Machines Corp',
    sector: 'Computer & Office Equipment',
  },
  {
    id: 'UNH',
    name: 'UnitedHealth Group Inc',
    sector: 'Hospital & Medical Service Plans',
  },
  {
    id: 'WMT',
    name: 'Walmart Inc',
    sector: 'Retail-variety Stores',
  },
  {
    id: 'JNJ',
    name: 'Johnson & Johnson',
    sector: 'Pharmaceutical Preparations',
  },
  {
    id: 'V',
    name: 'Visa Inc',
    sector: 'Services-business Services, Nec',
  },
  {
    id: 'HD',
    name: 'Home Depot Inc',
    sector: 'Retail-lumber & Other Building Materials Dealers',
  },
  {
    id: 'TRV',
    name: 'Travelers Companies Inc',
    sector: 'Fire, Marine & Casualty Insurance',
  },
];

export interface Ticker {
  id: string;
  name: string;
  sector: string;
  updateDate: Date;
  closePrice: number;
  prevDayClosePrice: number;
  changeFromPrevClosePrice: number;
  changeFromPrevClosePercent: number;
}

export interface PortfolioItem {
  tickerId: string;
  amount: number;
  indexInUi: number;
}

export interface SimulationDay {
  date: Date;
  value: number;
}

export interface UserProfile {
  id: string;
  balance: number;
}

export type PortfolioTicker = Ticker & Omit<PortfolioItem, 'tickerId'>;
