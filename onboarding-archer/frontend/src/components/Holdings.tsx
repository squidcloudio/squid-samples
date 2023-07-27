import React from 'react';
import { PortfolioItem } from '@/types/PortfolioTypes.ts';
import DistributionCard from '@/components/DistributionCard.tsx';
import { DistributionTitle } from '@/components/DistributionTitle.tsx';
import Icon from '@/components/lib/Icon.tsx';

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
      <DistributionTitle className="mb-[16px]">Holdings</DistributionTitle>
      <div className="flex items-center justify-between">
        <div className="text-[60px] font-extrabold leading-[42px]">
          {portfolio.length}
        </div>
        <div className="flex justify-end items-center">
          {portfolio.map((item, index) => (
            <Icon
              className={`w-[40px] h-[40px] rounded-[40px] border-[1px] border-line1 ${
                index !== 0 ? '-ml-[14px]' : ''
              }`}
              icon={item.tickerId as any}
            ></Icon>
          ))}
        </div>
      </div>
    </DistributionCard>
  );
}
