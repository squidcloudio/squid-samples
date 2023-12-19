import { PortfolioTicker } from 'common/common-types';

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
