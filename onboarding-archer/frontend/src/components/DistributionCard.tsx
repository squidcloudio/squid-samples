import { HTMLAttributes } from 'react';

export default function DistributionCard({
  children,
  className,
}: HTMLAttributes<HTMLElement>) {
  return (
    <div
      className={`p-[20px] rounded-[8px] border border-line1 ${
        className ?? ''
      }`}
    >
      {children}
    </div>
  );
}
