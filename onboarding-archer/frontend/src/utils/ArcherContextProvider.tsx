import { createContext, ReactNode, useContext, useState } from 'react';
import { useCollection, useQuery } from '@squidcloud/react';
import {
  PortfolioItem,
  PortfolioTicker,
  Ticker,
  UserProfile,
} from 'common/common-types';

export interface DocModalData {
  title: string;
  mdFilePath: string;
}

export interface ArcherContextData {
  ready: boolean;
  allTickers: Array<Ticker>;
  allTickersMap: Record<string, Ticker>;
  portfolio: Array<PortfolioTicker>;
  userProfile: UserProfile | undefined;
  confirmationMessage: ReactNode | undefined;
  setConfirmationMessage: (message: ReactNode | undefined) => void;
  mainModalOpen: boolean;
  setMainModalOpen: (open: boolean) => void;
  nextStepsModalOpen: boolean;
  setNextStepsModalOpen: (open: boolean) => void;
  docModalData: DocModalData | undefined;
  setDocModalData: (data: DocModalData | undefined) => void;
  inspectModeEnabled: boolean;
  setInspectModeEnabled: (open: boolean) => void;
  openTooltipId?: string;
  setOpenTooltipId: (id: string | undefined) => void;
}

interface ArcherContextProviderProps {
  children: ReactNode;
}

const ArcherContext = createContext<ArcherContextData | null>(null);

export function ArcherContextProvider({
  children,
}: ArcherContextProviderProps) {
  const [confirmationMessage, setConfirmationMessage] = useState<
    ReactNode | undefined
  >(undefined);

  const [mainModalOpen, setMainModalOpen] = useState<boolean>(false);
  const [docModalData, setDocModalData] = useState<DocModalData | undefined>(
    undefined,
  );
  const [nextStepsModalOpen, setNextStepsModalOpen] = useState<boolean>(false);
  const [inspectModeEnabled, setInspectModeEnabled] = useState<boolean>(false);
  const [openTooltipId, setOpenTooltipId] = useState<string | undefined>(
    undefined,
  );

  const userProfileCollection = useCollection<UserProfile>('userProfile');
  const { loading: userProfileLoading, data: userProfiles } = useQuery(
    userProfileCollection.query().eq('id', 'defaultUser').dereference(),
  );

  const tickerCollection = useCollection<Ticker>('ticker');
  const { loading: tickersLoading, data: allTickers } = useQuery(
    tickerCollection.query().dereference(),
  );

  const portfolioCollection = useCollection<PortfolioItem>('portfolio');
  const { loading: portfolioItemsLoading, data: portfolioItems } = useQuery(
    portfolioCollection.query().sortBy('indexInUi').dereference(),
  );

  const allTickersMap = allTickers.reduce(
    (map, item) => {
      map[item.id] = item;
      return map;
    },
    {} as Record<string, Ticker>,
  );

  const portfolio = portfolioItems.map<PortfolioTicker>((item) => ({
    ...allTickersMap[item.tickerId],
    amount: item.amount,
    indexInUi: item.indexInUi,
  }));

  const data: ArcherContextData = {
    allTickers: allTickers,
    allTickersMap,
    portfolio,
    userProfile: userProfiles[0],
    ready: !tickersLoading && !portfolioItemsLoading && !userProfileLoading,
    confirmationMessage,
    setConfirmationMessage,
    mainModalOpen,
    setMainModalOpen,
    nextStepsModalOpen,
    docModalData,
    setDocModalData,
    setNextStepsModalOpen,
    inspectModeEnabled,
    setInspectModeEnabled,
    openTooltipId,
    setOpenTooltipId,
  };

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
