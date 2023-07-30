import {
  PortfolioItem,
  PortfolioTicker,
  UserProfile,
} from '@/common/common-types.ts';
import { ArcherContextData } from '@/utils/ArcherContextProvider.tsx';
import { CollectionReference } from '@squidcloud/client';

export function calculatePercent(
  portfolio: Array<PortfolioTicker>,
  portfolioItem: PortfolioTicker,
): number {
  const portfolioTotal = portfolio.reduce(
    (acc, item) => acc + item.closePrice * item.amount,
    0,
  );
  return parseFloat(
    (
      ((portfolioItem.closePrice * portfolioItem.amount) / portfolioTotal) *
      100
    ).toFixed(2),
  );
}

export function buyOrSellTicker(
  archerContext: ArcherContextData,
  portfolioCollection: CollectionReference<PortfolioItem>,
  userProfileCollection: CollectionReference<UserProfile>,
  tickerId: string,
  amount: number,
  index: number,
  txId?: string,
): void {
  const { allTickersMap, portfolio, userProfile } = archerContext;
  const ticker = allTickersMap[tickerId];
  if (!ticker) {
    console.error(`Ticker ${tickerId} not found`);
    return;
  }
  const portfolioItem = portfolio.find((item) => item.id === ticker.id);
  const balance = userProfile?.balance || 0;
  const amountOwned = portfolioItem?.amount || 0;

  if (amount === 0) return;

  // We cannot sell more than we own
  if (amount < 0 && amountOwned + amount < 0) return;

  const usdValue = amount * ticker.closePrice;
  // We don't have enough balance to buy these tickers
  if (amount > 0 && usdValue > balance) return;

  const userProfileDoc = userProfileCollection.doc(
    userProfile?.id || 'defaultUser',
  );
  userProfileDoc.incrementInPath('balance', -usdValue, txId).then();
  const portfolioDoc = portfolioCollection.doc(ticker.id);
  if (portfolioItem) {
    portfolioDoc.incrementInPath('amount', amount, txId).then();
  } else {
    portfolioDoc
      .insert({ tickerId: ticker.id, amount: amount, indexInUi: index }, txId)
      .then();
  }
}
