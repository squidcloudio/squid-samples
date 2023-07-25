import StockDistribution from '@/components/StockDistribution.tsx';
import { PortfolioItem } from '@/types/PortfolioTypes.ts';

interface DistributionAndDiversityProps {
  portfolio: Array<PortfolioItem>;
}

export default function DistributionAndDiversity({
  portfolio,
}: DistributionAndDiversityProps) {
  return (
    <div className="bg-bg4 p-[20px] rounded-[16px]">
      <StockDistribution portfolio={portfolio} />
    </div>
  );
}
