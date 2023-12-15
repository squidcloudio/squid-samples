import DistributionCard from '@/components/DistributionCard';
import { DistributionTitle } from '@/components/DistributionTitle';
import Icon from '@/components/lib/Icon';
import { useArcherContext } from '@/utils/ArcherContextProvider';
import { HTMLAttributes } from 'react';
import { Icons } from '@/utils/icons';

export default function Holdings({
  className,
  ...otherProps
}: HTMLAttributes<HTMLElement>) {
  const portfolio = useArcherContext().portfolio.filter(
    (item) => item.amount > 0,
  );
  return (
    <DistributionCard {...otherProps} className={` ${className ?? ''}`}>
      <DistributionTitle className="mb-[16px]">Holdings</DistributionTitle>
      <div className="flex items-center justify-between">
        <div className="text-[60px] font-extrabold leading-[42px]">
          {portfolio.length}
        </div>
        <div className="flex justify-end items-center">
          {portfolio.map((item, index) => (
            <div title={item.name} key={item.id}>
              <Icon
                className={`w-[40px] h-[40px] rounded-[40px] border border-line1 ${
                  index !== 0 ? '-ml-[14px]' : ''
                }`}
                icon={item.id as keyof typeof Icons}
              ></Icon>
            </div>
          ))}
        </div>
      </div>
    </DistributionCard>
  );
}
