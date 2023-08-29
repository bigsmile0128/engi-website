export enum BitCreationStep {
  REPOSITORY,
  TESTS,
  DETAILS,
  FUNDING,
  PREVIEW,
}

export enum TestResult {
  'FAILED' = 'FAILED',
  'IGNORED' = 'IGNORED',
  'PASSED' = 'PASSED',
}

export type Test = {
  failedResultMessage?: string;
  id: string;
  required: boolean;
  result: TestResult;
};

export type Solution = {
  attempt: {
    attemptId: string;
    attempter: string;
    tests: Test[];
  };
  author: any;
  jobId: string;
  patchUrl: string;
  solutionId: string;
};

export enum BitStatus {
  ACTIVE = 'ACTIVE',
  COMPLETE = 'COMPLETE',
  OPEN = 'OPEN',
}

export enum BitsOrderByProperty {
  CREATED_ON = 'CREATED_ON',
  FUNDING = 'FUNDING',
}

export enum OrderByDirection {
  ASC = 'ASC',
  DESC = 'DESC',
}

export type Fractional = {
  denominator: number;
  numerator: number;
};

export type RepositoryComplexity = {
  cyclomatic: number;
  sLOC: number;
};

export type Bit = {
  attemptCount: number;
  averageProgress?: Fractional;
  complexity?: RepositoryComplexity;
  createdOn?: {
    dateTime: string;
    number: number;
  };
  creator: string;
  funding: string;
  id: string;
  name: string;
  repository?: {
    branch: string;
    commit: string;
    fullName: string;
    name: string;
    organization: string;
    readme: string;
    url: string;
  };
  requirements: {
    isAddable: string;
    isDeletable: string;
    isEditable: string;
  };
  solution?: Solution;
  solutionUserCount: number;
  status: BitStatus;
  technologies: string[];
  tests: Test[];
  updatedOn?: {
    dateTime: string;
    number: number;
  };
};

export enum TransactionType {
  BUY = 'BUY',
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

export type BitsQueryArguments = {
  createdAfter?: string;
  creator?: string;
  limit: number;
  maxFunding?: string;
  minFunding?: string;
  orderByDirection?: OrderByDirection;
  orderByProperty?: BitsOrderByProperty;
  search?: string;
  skip: number;
  status?: BitStatus;
  technologies?: string[];
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

export type SubstrateAccount = {
  address: string;
  exists?: AccountExistenceResult;
  meta: {
    genesisHash?: string;
    name: string;
    source: string;
  };
  type: string;
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

export enum AccountExistenceResult {
  NO = 'NO',
  UNCONFIRMED = 'UNCONFIRMED',
  UNSUPPORTED_ADDRESS = 'UNSUPPORTED_ADDRESS',
  YES = 'YES',
}

export type UserInfo = {
  address: string;
  display: string;
  profileImageUrl?: string;
};

export enum SubmissionStatus {
  ATTEMPTED_ON_CHAIN = 'ATTEMPTED_ON_CHAIN',
  ENGINE_ATTEMPTING = 'ENGINE_ATTEMPTING',
  SOLVED_ON_CHAIN = 'SOLVED_ON_CHAIN',
}

export type Submission = {
  attemptId: number;
  status: SubmissionStatus;
  userInfo: UserInfo;
};

export enum DateOption {
  LAST_DAY = 'LAST_DAY',
  LAST_MONTH = 'LAST_MONTH',
  LAST_QUARTER = 'LAST_QUARTER',
  LAST_WEEK = 'LAST_WEEK',
  LAST_YEAR = 'LAST_YEAR',
}

export type JobSubmissionsDetailsPagedQueryArguments = {
  jobId: string;
  limit: number;
  skip: number;
};

export type Folder = {
  children: DirectoryTree[];
  name: string;
  path: string;
  size: number;
  type: 'directory';
};

export type File = {
  extension: string;
  name: string;
  path: string;
  size: number;
  type: 'file';
};

export type DirectoryTree = Folder | File;
