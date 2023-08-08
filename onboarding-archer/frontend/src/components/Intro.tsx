import Tooltip from '@/components/Tooltip';

export default function Intro() {
  return (
    <div className="px-5 py-6 bg-primary3 rounded-t-2xl">
      <div>
        <div className="text-primary1 font-extrabold mb-2 text-[28px] leading-[120%] flex items-center h-[36px]">
          <span className="gray_out_in_inspection_mode">Ticker Tape</span>
          <Tooltip className={'ml-2'} mdFile="realtime.md"></Tooltip>
        </div>
        <div className="text-text4 font-semibold text leading-[20px]">
          We've generated a $100K portfolio of five stocks from the DJIA. Keep
          or adjust the portfolio, run a 30-day simulation, and learn how Squid
          accelerates app development.
        </div>
      </div>
    </div>
  );
}
