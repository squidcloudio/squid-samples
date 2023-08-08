import React, { createContext, useContext, useMemo, useState } from 'react';
import {
  PortfolioItem,
  PortfolioTicker,
  Ticker,
  UserProfile,
} from '@/common/common-types';
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
  inspectModeEnabled: boolean;
  setInspectModeEnabled: (open: boolean) => void;
  openTooltipId?: string;
  setOpenTooltipId: (id: string | undefined) => void;
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

  const [mainModalOpen, setMainModalOpen] = useState<boolean>(false);
  const [inspectModeEnabled, setInspectModeEnabled] = useState<boolean>(false);
  const [openTooltipId, setOpenTooltipId] = useState<string | undefined>(
    undefined,
  );

  const userProfileCollection = useCollection<UserProfile>('userProfile');
  const { loading: userProfileLoading, data: userProfiles } = useQuery(
    userProfileCollection.query().eq('id', 'defaultUser').dereference(),
    true,
  );

  const tickerCollection = useCollection<Ticker>('ticker');
  const { loading: tickersLoading, data: allTickers } = useQuery(
    tickerCollection.query().dereference(),
    true,
  );

  const portfolioCollection = useCollection<PortfolioItem>('portfolio');
  const { loading: portfolioItemsLoading, data: portfolioItems } = useQuery(
    portfolioCollection.query().sortBy('indexInUi').dereference(),
    true,
  );

  const data = useMemo<ArcherContextData>(() => {
    const allTickersMap = allTickers.reduce((map, item) => {
      map[item.id] = item;
      return map;
    }, {} as Record<string, Ticker>);

    const portfolio = portfolioItems.map<PortfolioTicker>((item) => ({
      ...allTickersMap[item.tickerId],
      amount: item.amount,
      indexInUi: item.indexInUi,
    }));

    return {
      allTickers: allTickers,
      allTickersMap,
      portfolio,
      userProfile: userProfiles[0],
      ready: !tickersLoading && !portfolioItemsLoading && !userProfileLoading,
      confirmationMessage,
      setConfirmationMessage,
      mainModalOpen,
      setMainModalOpen,
      inspectModeEnabled,
      setInspectModeEnabled,
      openTooltipId,
      setOpenTooltipId,
    };
  }, [allTickers, portfolioItems, userProfiles]);

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
