import React, { createContext, useContext, useMemo } from 'react';
import {
  PortfolioItem,
  PortfolioTicker,
  Ticker,
} from '@/common/common-types.ts';
import { useCollection, useQuery } from '@squidcloud/react';

interface ArcherContextData {
  ready: boolean;
  allTickers: Array<Ticker>;
  portfolio: Array<PortfolioTicker>;
}

interface ArcherContextProviderProps {
  children: React.ReactNode;
}

const ArcherContext = createContext<ArcherContextData | null>(null);

export function ArcherContextProvider({
  children,
}: ArcherContextProviderProps) {
  const tickerCollection = useCollection<Ticker>('ticker');
  const portfolioCollection = useCollection<PortfolioItem>('portfolio');

  const allTickersResponse = useQuery<Ticker>(tickerCollection.query(), true);
  const portfolioResponse = useQuery<PortfolioItem>(
    portfolioCollection.query().sortBy('indexInUi'),
    true,
  );

  const data = useMemo(() => {
    if (!allTickersResponse.data || !portfolioResponse.data) {
      return {
        allTickers: [],
        portfolio: [],
        ready: false,
      };
    }

    const allTickersMap = allTickersResponse.data.reduce((map, item) => {
      map[item.id] = item;
      return map;
    }, {} as Record<string, Ticker>);

    const portfolio = portfolioResponse.data.map<PortfolioTicker>((item) => ({
      ...allTickersMap[item.tickerId],
      amount: item.amount,
      indexInUi: item.indexInUi,
    }));

    return {
      allTickers: allTickersResponse.data,
      portfolio,
      ready: !allTickersResponse.loading && !portfolioResponse.loading,
    };
  }, [allTickersResponse.data, portfolioResponse.data]);

  return (
    <ArcherContext.Provider value={data}>{children}</ArcherContext.Provider>
  );
}

export function useArcherContext() {
  const context = useContext(ArcherContext);
  if (context === null) {
    throw new Error(
      'useArcherContext must be used within an ArcherContextProvider',
    );
  }
  return context;
}
