// rounded to 2 decimals, use for display
// - NaNs become 0
export const displayAdaInEngi = (ada: number) =>
  (ada / Math.pow(10, 18) || 0).toFixed(2);
