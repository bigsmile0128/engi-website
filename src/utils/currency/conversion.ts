// rounded to 2 decimals, use for display
// - NaNs become 0
// modifier to return percentage of value (e.g. complete payout is 80% of total funding)
export const displayAdaInEngi = (ada: number, modifier = 1) => {
  const displayValue = ((ada / Math.pow(10, 18) || 0) * modifier).toFixed(3);
  if (ada !== 0 && displayValue === '0.000') {
    return '<0.001';
  } else if (ada !== 0 && displayValue === '-0.000') {
    return '0.000';
  }
  return displayValue;
};

export const engiToWoz = (engi: number) => engi * Math.pow(10, 18);
export const wozToEngi = (woz: number) => woz / Math.pow(10, 18);
