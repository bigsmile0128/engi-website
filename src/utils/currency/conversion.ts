// rounded to 2 decimals, use for display
// - NaNs become 0
// modifier to return percentage of value (e.g. complete payout is 80% of total funding)
export const displayAdaInEngi = (ada: number, modifier = 1) =>
  ((ada / Math.pow(10, 18) || 0) * modifier).toFixed(2);
