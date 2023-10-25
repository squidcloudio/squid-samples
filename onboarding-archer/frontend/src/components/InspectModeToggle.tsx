import { useArcherContext } from '@/utils/ArcherContextProvider';
import Icon from '@/components/lib/Icon';
import { HTMLAttributes } from 'react';

export default function InspectModeToggle({
  className,
  ...otherProps
}: HTMLAttributes<HTMLElement>) {
  const { inspectModeEnabled, setInspectModeEnabled } = useArcherContext();

  function toggleInspectMode(): void {
    setInspectModeEnabled(!inspectModeEnabled);
  }

  return (
    <div
      {...otherProps}
      className={`flex items-center gap-[8px] relative z-10 ${className ?? ''}`}
    >
      <div className={'absolute left-[-134px] bottom-[-37px]'}>
        <Icon icon={'navbar_rudder'}></Icon>
      </div>

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
