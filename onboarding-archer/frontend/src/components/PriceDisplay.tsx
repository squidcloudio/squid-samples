interface PriceDisplayProps {
  value: number | undefined;
  minimumFractionDigits?: number;
}

export default function PriceDisplay({
  value,
  minimumFractionDigits = 0,
}: PriceDisplayProps) {
  return (
    <>
      $
      {(value || 0).toLocaleString('en-US', {
        maximumFractionDigits: 2,
        minimumFractionDigits,
      })}
    </>
  );
}
