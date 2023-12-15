import { useArcherContext } from '@/utils/ArcherContextProvider';
import { useCollection } from '@squidcloud/react';
import { PortfolioItem, UserProfile } from 'common/common-types';

export function usePortfolio() {
  const archerContext = useArcherContext();
  const portfolioCollection = useCollection<PortfolioItem>('portfolio');
  const userProfileCollection = useCollection<UserProfile>('userProfile');

  function replaceTicker(
    tickerId: string,
    replaceWithTickerId: string,
    index: number,
    txId?: string,
  ) {
    const { allTickersMap, portfolio } = archerContext;
    const ticker = allTickersMap[tickerId];
    if (!ticker) {
      console.error(`Ticker ${tickerId} not found`);
      return;
    }
    const portfolioItem = portfolio.find((item) => item.id === ticker.id);

    // Sell all previous ticker
    buyOrSellTicker(tickerId, -(portfolioItem?.amount || 0), index, txId);

    // Delete current item
    portfolioCollection
      .doc(String(index))
      .update({ tickerId: replaceWithTickerId, amount: 0 })
      .then();
  }

  function buyOrSellTicker(
    tickerId: string,
    amount: number,
    index: number,
    txId?: string,
  ) {
    const { allTickersMap, portfolio, userProfile } = archerContext;
    const ticker = allTickersMap[tickerId];
    if (!ticker) {
      console.error(`Ticker ${tickerId} not found`);
      return;
    }
    if (!userProfile) return;
    const portfolioItem = portfolio.find((item) => item.id === ticker.id);
    const balance = userProfile.balance || 0;
    const amountOwned = portfolioItem?.amount || 0;

    if (amount === 0) return;

    // We cannot sell more than we own
    if (amount < 0 && amountOwned + amount < 0) return;

    const usdValue = amount * ticker.closePrice;
    // We don't have enough balance to buy these tickers
    if (amount > 0 && usdValue > balance) return;

    const userProfileDoc = userProfileCollection.doc(userProfile.id);
    userProfileDoc.incrementInPath('balance', -usdValue, txId).then();
    const portfolioDoc = portfolioCollection.doc(String(index));
    if (portfolioItem) {
      portfolioDoc.incrementInPath('amount', amount, txId).then();
    } else {
      portfolioDoc
        .insert({ tickerId: ticker.id, amount: amount, indexInUi: index }, txId)
        .then();
    }
  }

  return { portfolio: archerContext.portfolio, replaceTicker, buyOrSellTicker };
}
