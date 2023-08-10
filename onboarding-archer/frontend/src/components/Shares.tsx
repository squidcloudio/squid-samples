import React from 'react';
import DistributionCard from '@/components/DistributionCard';
import { DistributionTitle } from '@/components/DistributionTitle';
import { useArcherContext } from '@/utils/ArcherContextProvider';

export default function Shares({
  className,
  ...otherProps
}: React.HTMLAttributes<HTMLElement>) {
  const { portfolio } = useArcherContext();
  return (
    <DistributionCard {...otherProps} className={` ${className ?? ''}`}>
      <DistributionTitle className="mb-[16px]">Shares</DistributionTitle>
      <div className="text-[60px] font-extrabold leading-[42px]">
        {portfolio.reduce((acc, item) => acc + (item.amount || 0), 0)}
      </div>
    </DistributionCard>
  );
}
