import React from 'react';
import { PortfolioItem } from '@/types/PortfolioTypes.ts';
import DistributionCard from '@/components/DistributionCard.tsx';
import { DistributionTitle } from '@/components/DistributionTitle.tsx';

interface SharesProps extends React.HTMLAttributes<HTMLElement> {
  portfolio: Array<PortfolioItem>;
}

export default function Shares({
  portfolio,
  className,
  ...otherProps
}: SharesProps) {
  return (
    <DistributionCard {...otherProps} className={` ${className ?? ''}`}>
      <DistributionTitle className="mb-[16px]">Shares</DistributionTitle>
      <div className="text-[60px] font-extrabold leading-[42px]">
        {portfolio.reduce((acc, item) => acc + item.amount, 0)}
      </div>
    </DistributionCard>
  );
}
