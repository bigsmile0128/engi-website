export type Test = {
  id: string;
  result: string;
  resultMessage: string;
  required: string;
  requiredMessage: string;
};

export type Solution = {
  solutionId: string;
  jobId: string;
  author: string;
  patchUrl: string;
  attempt: {
    attemptId: string;
    attempter: string;
    tests: Test[];
  };
};

export enum JobStatus {
  OPEN = 'OPEN',
  ACTIVE = 'ACTIVE',
  COMPLETE = 'COMPLETE',
}

export enum Language {
  C = 'C',
  C_SHARP = 'C_SHARP',
  JAVA = 'JAVA',
  JAVASCRIPT = 'JAVASCRIPT',
  PYTHON = 'PYTHON',
  RUST = 'RUST',
  TYPESCRIPT = 'TYPESCRIPT',
}

export type Job = {
  id: string;
  creator: string;
  funding: number;
  repository?: {
    url: string;
    branch: string;
    commit: string;
  };
  language: Language;
  name: string;
  tests: Test[];
  requirements: {
    isEditable: string;
    isAddable: string;
    isDeletable: string;
  };
  solution?: Solution;
  attemptCount: number;
  createdOn?: {
    number: string;
    dateTime: string;
  };
  updatedOn?: {
    number: string;
    dateTime: string;
  };
  status: JobStatus;
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
