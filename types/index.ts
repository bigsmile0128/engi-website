export type Job = {
  language?: string;
  title?: string;
  numTests?: number;
  testsPassed?: number;
  timeEstimate?: number;
  reward?: number;
  numContributors?: number;
  id?: string;
  description?: string;
  created?: string;
};

export enum TransactionType {
  EXCHANGE = 'EXCHANGE',
  TRANSFER = 'TRANSFER',
  SPEND = 'SPEND',
  INCOME = 'INCOME',
}

export type Transaction = {
  number: number;
  hash: string;
  dateTime: string;
  type: TransactionType;
  executor: string;
  isSuccessful: boolean;
  otherParticipants?: string[];
  amount: number;
  jobId?: string;
};
