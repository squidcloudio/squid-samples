import Chart, { SimulationData } from '@/components/Chart.tsx';
import GainLoseIndicator from '@/components/GainLoseIndicator.tsx';
import TimeSelector, { SelectedChartTime } from '@/components/TimeSelector.tsx';
import { useArcherContext } from '@/utils/ArcherContextProvider.tsx';
import PriceDisplay from '@/components/PriceDisplay.tsx';
import React, { useEffect, useState } from 'react';
import { useCollection, useQuery } from '@squidcloud/react';
import { SimulationDay } from '@/common/common-types.ts';
import _ from 'lodash';
import Button from '@/components/Button.tsx';
import { Link } from 'react-router-dom';
import Icon from '@/components/lib/Icon.tsx';

interface ChartTimeRange {
  startIndex: number;
  endIndex: number;
}

const timeToRangeMap: Record<SelectedChartTime, ChartTimeRange> = {
  w1: {
    startIndex: 0,
    endIndex: 5,
  },
  w2: {
    startIndex: 5,
    endIndex: 10,
  },
  w3: {
    startIndex: 10,
    endIndex: 15,
  },
  w4: {
    startIndex: 15,
    endIndex: 20,
  },
  '1m': {
    startIndex: 0,
    endIndex: 29,
  },
};

function getConfirmationBarMessage(percentChanged: number): React.ReactNode {
  const gained = percentChanged >= 0;
  const percentChangedString = Math.abs(percentChanged).toFixed(2);
  const message = (
    <>
      <Icon
        icon={gained ? 'check_icon' : 'warning_icon'}
        className="w-auto inline-block mr-2 self-center mt-[-3px]"
      />
      {gained ? (
        <>
          <span className="font-bold">Congrats!</span> Looks like your stock
          portfolio went up {percentChangedString}% in 30 days!
        </>
      ) : (
        <>
          <span className="font-bold">Oooops!</span> Your portfolio dropped{' '}
          {percentChangedString}%. Good thing this was just a simulation!
        </>
      )}
    </>
  );
  /*const message = gained ? (
    <>
      <span className="font-bold">Congrats!</span> Looks like your stock
      portfolio went up {percentChangedString}% in 30 days!
    </>
  ) : (
    <>
      <span className="font-bold">Oooops!</span> Your portfolio dropped{' '}
      {percentChangedString}%. Good thing this was just a simulation!
    </>
  );*/
  return (
    <>
      {message}
      <a
        className="mx-2 underline"
        href="https://console.squid.cloud"
        target="_blank"
      >
        Explore next steps
      </a>
      or
      <div className="inline-block">
        <Link to="https://console.squid.cloud" target="_blank">
          <Button buttonType="tertiary" className="ml-3 inline-block">
            Go to Console
          </Button>
        </Link>
      </div>
    </>
  );
}

export default function ChartAndData() {
  const { portfolio, setConfirmationMessage } = useArcherContext();
  const [selectedChartTime, setSelectedChartTime] =
    useState<SelectedChartTime>('w1');

  const simulationDayCollection = useCollection<SimulationDay>('simulationDay');
  const ranges = timeToRangeMap[selectedChartTime];

  const queryResult = useQuery(
    simulationDayCollection.query().sortBy('date'),
    true,
  );

  const data: Array<SimulationData> = [];
  if (selectedChartTime === '1m') {
    const chunkSize = Math.ceil(queryResult.data.length / 4);
    const chunks = _.chunk(queryResult.data, chunkSize);
    chunks.forEach((chunk, i) => {
      data.push({
        name: `Week ${i + 1}`,
        value: chunk.reduce((acc, item) => acc + item.value, 0),
      });
    });
  } else {
    queryResult.data
      .slice(ranges.startIndex, ranges.endIndex)
      .forEach((simulationDay, i) => {
        data.push({ name: `Day ${i + 1}`, value: simulationDay.value });
      });
  }

  const isDataGenerated = !!data.length;

  const currentPortfolioValue = isDataGenerated
    ? queryResult.data[queryResult.data.length - 1].value
    : 0;

  let portfolioValueToday = 0;
  let portfolioValueYesterday = 0;

  portfolio.forEach((portfolioTicker) => {
    const valueToday = portfolioTicker.closePrice * portfolioTicker.amount;
    const valueYesterday =
      portfolioTicker.prevDayClosePrice * portfolioTicker.amount;

    portfolioValueToday += valueToday;
    portfolioValueYesterday += valueYesterday;
  });

  const firstDayValue = queryResult.data[0]?.value || 0;
  const totalChangeInValue = currentPortfolioValue - firstDayValue;
  const totalChangeInPercent = (totalChangeInValue / firstDayValue) * 100;

  useEffect(() => {
    if (totalChangeInPercent)
      setConfirmationMessage(getConfirmationBarMessage(totalChangeInPercent));
  }, [totalChangeInPercent]);

  return (
    <div className="w-full mb-[48px]">
      <div className="flex justify-between items-center border-b border-line1 pb-[12px] mb-[12px]">
        <div className="flex items-center">
          <div
            className={`text-[32px] font-extrabold leading-[100%] mr-[12px] ${
              !isDataGenerated ? 'text-text3' : ''
            }`}
          >
            <PriceDisplay
              value={currentPortfolioValue}
              minimumFractionDigits={2}
            />
          </div>
          {isDataGenerated ? (
            <GainLoseIndicator percentChange={totalChangeInPercent} />
          ) : null}
        </div>
        <TimeSelector
          selectedChartTime={selectedChartTime}
          setSelectedChartTime={setSelectedChartTime}
          isDataGenerated={isDataGenerated}
        />
      </div>
      <Chart data={data} />
    </div>
  );
}
