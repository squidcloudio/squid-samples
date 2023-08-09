import React from 'react';

export default function DistributionCard({
  children,
  className,
}: React.HTMLAttributes<HTMLElement>) {
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
