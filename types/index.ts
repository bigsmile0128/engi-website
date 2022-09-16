export enum TestResult {
  'PASSED' = 'PASSED',
  'FAILED' = 'FAILED',
  'IGNORED' = 'IGNORED',
}

export type Test = {
  id: string;
  result: string;
  required: string;
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
  funding: string;
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
    number: number;
    dateTime: string;
  };
  updatedOn?: {
    number: number;
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

// copies from same story figma plugin repo
export interface DFormValue {
  name: string;
  value: string;
}

export type DFormValues = Array<DFormValue>;

export interface Specification {
  args?: DFormValues;
  branch?: string;
  check_id: string;
  commit?: string;
  component: string;
  github_token?: string;
  height: string;
  path: string;
  repository: string;
  story: string;
  url_check_frame: string;
  width: string;
  dataPath: string;
  debug?: boolean;
}
