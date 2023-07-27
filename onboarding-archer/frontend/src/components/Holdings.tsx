import React from 'react';
import { PortfolioItem } from '@/types/PortfolioTypes.ts';
import DistributionCard from '@/components/DistributionCard.tsx';

interface HoldingsProps extends React.HTMLAttributes<HTMLElement> {
  portfolio: Array<PortfolioItem>;
}

export default function Holdings({
  portfolio,
  className,
  ...otherProps
}: HoldingsProps) {
  return (
    <DistributionCard {...otherProps} className={` ${className ?? ''}`}>
      holdings
    </DistributionCard>
  );
}
