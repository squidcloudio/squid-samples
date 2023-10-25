import { HTMLAttributes } from 'react';

export function DistributionTitle({
  children,
  className,
  ...otherProps
}: HTMLAttributes<HTMLElement>) {
  return (
    <div
      {...otherProps}
      className={`text font-extrabold leading-[16px] ${className ?? ''}`}
    >
      {children}
    </div>
  );
}
