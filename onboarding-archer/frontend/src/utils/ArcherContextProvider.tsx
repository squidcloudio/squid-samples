import React, { createContext, useContext, useMemo, useState } from 'react';
import {
  PortfolioItem,
  PortfolioTicker,
  Ticker,
  UserProfile,
} from '@/common/common-types.ts';
import { useCollection, useQuery } from '@squidcloud/react';

export interface ArcherContextData {
  ready: boolean;
  allTickers: Array<Ticker>;
  allTickersMap: Record<string, Ticker>;
  portfolio: Array<PortfolioTicker>;
  userProfile: UserProfile | undefined;
  confirmationMessage: React.ReactNode | undefined;
  setConfirmationMessage: (message: React.ReactNode | undefined) => void;
  mainModalOpen: boolean;
  setMainModalOpen: (open: boolean) => void;
}

interface ArcherContextProviderProps {
  children: React.ReactNode;
}

const ArcherContext = createContext<ArcherContextData | null>(null);

export function ArcherContextProvider({
  children,
}: ArcherContextProviderProps) {
  const [confirmationMessage, setConfirmationMessage] = useState<
    React.ReactNode | undefined
  >(undefined);

  const [mainModalOpen, setMainModalOpen] = React.useState(false);

  const userProfileCollection = useCollection<UserProfile>('userProfile');
  const userProfileResponse = useQuery<UserProfile>(
    userProfileCollection.query().eq('id', 'defaultUser'),
    true,
  );

  const tickerCollection = useCollection<Ticker>('ticker');
  const allTickersResponse = useQuery<Ticker>(tickerCollection.query(), true);

  const portfolioCollection = useCollection<PortfolioItem>('portfolio');
  const portfolioResponse = useQuery<PortfolioItem>(
    portfolioCollection.query().sortBy('indexInUi'),
    true,
  );

  const data = useMemo<ArcherContextData>(() => {
    if (!allTickersResponse.data || !portfolioResponse.data) {
      return {
        allTickers: [],
        allTickersMap: {},
        portfolio: [],
        userProfile: undefined,
        ready: false,
        confirmationMessage,
        setConfirmationMessage,
        mainModalOpen,
        setMainModalOpen,
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
      allTickersMap,
      portfolio,
      userProfile: userProfileResponse.data[0],
      ready: !allTickersResponse.loading && !portfolioResponse.loading,
      confirmationMessage,
      setConfirmationMessage,
      mainModalOpen,
      setMainModalOpen,
    };
  }, [
    allTickersResponse.data,
    portfolioResponse.data,
    userProfileResponse.data,
  ]);

  return (
    <ArcherContext.Provider value={data}>{children}</ArcherContext.Provider>
  );
}

export function useArcherContext(): ArcherContextData {
  const context = useContext(ArcherContext);
  if (context === null) {
    throw new Error(
      'useArcherContext must be used within an ArcherContextProvider',
    );
  }
  return context;
}
