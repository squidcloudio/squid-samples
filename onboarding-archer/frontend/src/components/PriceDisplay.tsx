export default function PriceDisplay({ value }: { value: number | undefined }) {
  return `$${(value || 0).toLocaleString('en-US', {
    maximumFractionDigits: 2,
  })}`;
}
