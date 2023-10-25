import dayjs from 'dayjs';

export function fluctuatePrice(price?: number, changePercentRange = 0.03): number {
  price = price || getRandomNumber(10, 130);
  const changePercent = (Math.random() - 0.5) * 2 * changePercentRange;
  let newPrice = price + (price * changePercent) / 100;
  newPrice = Math.round(newPrice * 100) / 100;
  return newPrice;
}

export function getRandomNumber(min: number, max: number): number {
  return Math.random() * (max - min + 1) + min;
}

export function isSameDate(dateToCompare?: Date): boolean {
  if (!dateToCompare) return false;
  const today = dayjs();
  const dayjsDateToCompare = dayjs(dateToCompare);
  return today.format('YYYY-MM-DD') === dayjsDateToCompare.format('YYYY-MM-DD');
}
