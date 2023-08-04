import { useArcherContext } from '@/utils/ArcherContextProvider.tsx';
import Icon from '@/components/lib/Icon.tsx';
import React from 'react';

export default function InspectModeToggle({
  className,
  ...otherProps
}: React.HTMLAttributes<HTMLElement>) {
  const { inspectModeEnabled, setInspectModeEnabled } = useArcherContext();

  function toggleInspectMode(): void {
    setInspectModeEnabled(!inspectModeEnabled);
  }

  return (
    <div
      {...otherProps}
      className={`flex items-center gap-[8px] ${className ?? ''}`}
    >
      <div className="text-primary1 text-[12px] font-extrabold leading-[16px]">
        Tooltips
      </div>
      <div
        className={`w-[54px] h-[28px] rounded-[100px] p-[2px] flex cursor-pointer ${
          inspectModeEnabled ? `bg-primary1` : `bg-line3`
        }`}
        onClick={toggleInspectMode}
      >
        <div
          className={`transition-[margin] duration-[300ms] ${
            inspectModeEnabled ? `ml-[26px]` : `0`
          }`}
        >
          <Icon icon={'inspector_toggle'}></Icon>
        </div>
      </div>
    </div>
  );
}
