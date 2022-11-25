export enum TestResult {
  'FAILED' = 'FAILED',
  'IGNORED' = 'IGNORED',
  'PASSED' = 'PASSED',
}

export type Test = {
  id: string;
  required: string;
  result: string;
};

export type Solution = {
  attempt: {
    attemptId: string;
    attempter: string;
    tests: Test[];
  };
  author: string;
  jobId: string;
  patchUrl: string;
  solutionId: string;
};

export enum JobStatus {
  ACTIVE = 'ACTIVE',
  COMPLETE = 'COMPLETE',
  OPEN = 'OPEN',
}

export enum Language {
  C = 'C',
  C_SHARP = 'C_SHARP',
  JAVA = 'JAVA',
  JAVA_SCRIPT = 'JAVA_SCRIPT',
  PYTHON = 'PYTHON',
  RUST = 'RUST',
  TYPESCRIPT = 'TYPESCRIPT',
}

export type Fractional = {
  denominator: number;
  numerator: number;
};

export type Job = {
  attemptCount: number;
  averageProgress?: Fractional;
  createdOn?: {
    dateTime: string;
    number: number;
  };
  creator: string;
  funding: string;
  id: string;
  language: Language;
  name: string;
  repository?: {
    branch: string;
    commit: string;
    url: string;
  };
  requirements: {
    isAddable: string;
    isDeletable: string;
    isEditable: string;
  };
  solution?: Solution;
  solutionUserCount: number;
  status: JobStatus;
  tests: Test[];
  updatedOn?: {
    dateTime: string;
    number: number;
  };
};

export enum TransactionType {
  EXCHANGE = 'EXCHANGE',
  INCOME = 'INCOME',
  SPEND = 'SPEND',
  TRANSFER = 'TRANSFER',
}

export type Transaction = {
  amount: number;
  dateTime: string;
  executor: string;
  hash: string;
  isSuccessful: boolean;
  jobId?: string;
  number: number;
  otherParticipants?: string[];
  type: TransactionType;
};

export type JobsQueryArguments = {
  creator?: string;
  language?: Language;
  limit: number;
  maxFunding?: number;
  minFunding?: number;
  orderByDirection?: 'ASC' | 'DESC';
  orderByProperty?: 'CREATED_ON' | 'FUNDING';
  search?: string;
  skip: number;
  status?: string;
};

export type GithubRepositoryOwner = {
  avatarUrl?: string;
  login: string;
};

export type GithubRepositoryWithOwner = {
  fullName: string;
  isPrivate: boolean;
  name: string;
  owner?: GithubRepositoryOwner;
};

export type Commit = {
  author: string;
  committer: string;
  message: string;
  sha: string;
};

export type UserGithubEnrollment = {
  createdOn: string;
  installationId: number;
  owner?: GithubRepositoryOwner;
};

// copies from same story figma plugin repo
export interface DFormValue {
  name: string;
  value: string;
}

export enum SENDGRID_LIST_NAME {
  CONTACT_US = 'contact-us',
  ENGI_NEWSLETTER = 'engi-newsletter',
}
