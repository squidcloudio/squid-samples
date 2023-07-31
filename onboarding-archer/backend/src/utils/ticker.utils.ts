export function fluctuatePrice(
  price?: number,
  changePercentRange = 0.03
): number {
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

  // Get today's date
  const today: Date = new Date();
  const todayYear: number = today.getFullYear();
  const todayMonth: number = today.getMonth();
  const todayDay: number = today.getDate();

  // Extract date components from the date to compare
  const yearToCompare: number = dateToCompare.getFullYear();
  const monthToCompare: number = dateToCompare.getMonth();
  const dayToCompare: number = dateToCompare.getDate();

  // Compare the date components
  return (
    yearToCompare === todayYear &&
    monthToCompare === todayMonth &&
    dayToCompare === todayDay
  );
}
