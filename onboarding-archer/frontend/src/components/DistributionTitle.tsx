import React from 'react';

export function DistributionTitle({
  children,
  className,
  ...otherProps
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <div
      {...otherProps}
      className={`text-[16px] font-extrabold leading-[16px] ${className ?? ''}`}
    >
      {children}
    </div>
  );
}
