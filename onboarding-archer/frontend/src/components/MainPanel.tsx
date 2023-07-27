import ChartAndData from '@/components/ChartAndData.tsx';
import DistributionAndDiversity from '@/components/DistributionAndDiversity.tsx';
import { PortfolioItem } from '@/types/PortfolioTypes.ts';

export default function MainPanel() {
  const portfolioItems: Array<PortfolioItem> = [
    {
      tickerId: 'AAPL',
      amount: 50,
      currentPrice: 10,
      sector: 'Technology',
      changeFromYesterdayPercent: 0.1,
      changeFromYesterdayPrice: 1,
    },
    {
      tickerId: 'MSFT',
      amount: 20,
      currentPrice: 10,
      sector: 'Technology',
      changeFromYesterdayPercent: 0.1,
      changeFromYesterdayPrice: 1,
    },
    {
      tickerId: 'DIS',
      amount: 10,
      currentPrice: 10,
      sector: 'Entertainment',
      changeFromYesterdayPercent: 0.1,
      changeFromYesterdayPrice: 1,
    },
    {
      tickerId: 'JNJ',
      amount: 10,
      currentPrice: 10,
      sector: 'Communication Services',
      changeFromYesterdayPercent: 0.1,
      changeFromYesterdayPrice: 1,
    },
    {
      tickerId: 'PG',
      amount: 10,
      currentPrice: 10,
      sector: 'Healthcare',
      changeFromYesterdayPercent: 0.1,
      changeFromYesterdayPrice: 1,
    },
  ];
  return (
    <div>
      <div className="text-[16px] text-text1 mb-6 font-extrabold">
        Portfolio Performance
      </div>
      <div>
        <ChartAndData />
        <DistributionAndDiversity portfolio={portfolioItems} />
      </div>
    </div>
  );
}
