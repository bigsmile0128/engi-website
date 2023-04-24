// rounded to 2 decimals, use for display
// - NaNs become 0
// modifier to return percentage of value (e.g. complete payout is 80% of total funding)
export const displayAdaInEngi = (ada: number, modifier = 1) => {
  const displayValue = ((ada / Math.pow(10, 18) || 0) * modifier).toFixed(2);
  if (ada !== 0 && displayValue === '0.00') {
    return '<0.01';
  } else if (ada !== 0 && displayValue === '-0.00') {
    return '0.00';
  }
  return displayValue;
};

export const engiToWoz = (engi: number) => engi * Math.pow(10, 18);
