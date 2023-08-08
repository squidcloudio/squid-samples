import React from 'react';

export function DistributionTitle({
  children,
  className,
  ...otherProps
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <div
      {...otherProps}
      className={`text font-extrabold leading-[16px] ${className ?? ''}`}
    >
      {children}
    </div>
  );
}
