import { PortfolioTicker } from '@/common/common-types.ts';

export function calculatePercent(
  portfolio: Array<PortfolioTicker>,
  portfolioItem: PortfolioTicker,
): number {
  const portfolioTotal = portfolio.reduce(
    (acc, item) => acc + item.closePrice * item.amount,
    0,
  );
  return Math.floor(
    ((portfolioItem.closePrice * portfolioItem.amount) / portfolioTotal) * 100,
  );
}
