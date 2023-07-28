import { PortfolioItem } from '@/common/common-types.ts';

export function calculatePercent(
  portfolio: Array<PortfolioItem>,
  portfolioItem: PortfolioItem,
): number {
  const portfolioTotal = portfolio.reduce(
    (acc, item) => acc + item.currentPrice * item.amount,
    0,
  );
  return Math.floor(
    ((portfolioItem.currentPrice * portfolioItem.amount) / portfolioTotal) *
      100,
  );
}
