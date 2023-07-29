export function fluctuatePrice(price?: number): number {
  price = price || getRandomNumber(10, 130);
  let changePercent = Math.random() * 0.08 - 0.04;
  changePercent = changePercent / 10;
  let newPrice = price + price * changePercent;
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
