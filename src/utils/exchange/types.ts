export type MoveType = 'Withdraw' | 'Buy' | 'Transfer';

export type PreviewMoveEngi = {
  // +/- should be reflected in this amount
  amount: number;
  move: MoveType;
};
