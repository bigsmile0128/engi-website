import type { Meta, StoryObj } from '@storybook/react';
import { BitStatus } from '~/types';
import BountyStatus from '.';

const meta: Meta = {
  title: 'BountyStatus',
  component: BountyStatus,
  argTypes: {
    status: {
      options: [BitStatus.OPEN, BitStatus.ACTIVE, BitStatus.COMPLETE],
    },
  },
};

export default meta;

type Story = StoryObj<typeof BountyStatus>;

export const Loading: Story = {
  args: {
    className: 'w-[300px]',
    isLoading: true,
  },
};

export const FreelancerNotStarted: Story = {
  name: 'Freelancer - Not started',
  args: {
    className: '',
    attemptCount: 0,
    created: '2023-05-24T19:51:12Z',
    creator: 'CREATOR_ID',
    currentUserSubmission: undefined,
    id: '123',
    solution: undefined,
    status: BitStatus.OPEN,
    userId: 'USER_ID',
  },
};

export const FreelancerAnalyzing: Story = {
  name: 'Freelancer - Analyzing',
  args: {
    className: '',
    attemptCount: 0,
    created: '2023-05-24T19:51:12Z',
    creator: 'CREATOR_ID',
    currentUserSubmission: {
      stages: [
        {
          results: {},
          stage: 'Compiling',
          status: 'PASSED',
        },
        {
          results: {},
          stage: 'Linting',
          status: 'PASSED',
        },
        {
          results: {},
          stage: 'Testing',
          status: 'ANALYZING',
        },
        {
          results: {},
          stage: 'Approval',
          status: 'WAITING',
        },
      ],
      status: 'ANALYZING',
    },
    id: '123',
    solution: undefined,
    status: BitStatus.ACTIVE,
    userId: 'USER_ID',
  },
};

export const FreelancerSubmission: Story = {
  name: 'Freelancer - Submission',
  args: {
    className: '',
    attemptCount: 0,
    created: '2023-05-24T19:51:12Z',
    creator: 'CREATOR_ID',
    currentUserSubmission: {
      stages: [
        {
          results: {},
          stage: 'Compiling',
          status: 'PASSED',
        },
        {
          results: {},
          stage: 'Linting',
          status: 'PASSED',
        },
        {
          results: {},
          stage: 'Testing',
          status: 'FAILED',
        },
        {
          results: {},
          stage: 'Approval',
          status: 'SKIPPED',
        },
      ],
      status: 'DONE',
    },
    id: '123',
    solution: undefined,
    status: BitStatus.ACTIVE,
    userId: 'USER_ID',
  },
};

export const FreelancerCompleted: Story = {
  name: 'Freelancer - Completed by user',
  args: {
    className: '',
    attemptCount: 0,
    created: '2023-05-24T19:51:12Z',
    creator: 'CREATOR_ID',
    currentUserSubmission: {
      stages: [
        {
          results: {},
          stage: 'Compiling',
          status: 'PASSED',
        },
        {
          results: {},
          stage: 'Linting',
          status: 'PASSED',
        },
        {
          results: {},
          stage: 'Testing',
          status: 'PASSED',
        },
        {
          results: {},
          stage: 'Approval',
          status: 'PASSED',
        },
      ],
      status: 'DONE',
    },
    id: '123',
    solution: {
      attempt: {
        attemptId: 'ATTEMPT_ID',
        attempter: 'USER_ID',
        tests: [],
      },
      author: 'USER_ID',
      jobId: 'JOB_ID',
      patchUrl: 'https://github.com/engi-network/website/pull/75',
      solutionId: 'SOLUTION_ID',
    },
    status: BitStatus.COMPLETE,
    userId: 'USER_ID',
  },
};
export const FreelancerCompletedOther: Story = {
  name: 'Freelancer - Completed by another user',
  args: {
    className: '',
    attemptCount: 0,
    created: '2023-05-24T19:51:12Z',
    creator: 'CREATOR_ID',
    currentUserSubmission: {
      stages: [
        {
          results: {},
          stage: 'Compiling',
          status: 'PASSED',
        },
        {
          results: {},
          stage: 'Linting',
          status: 'PASSED',
        },
        {
          results: {},
          stage: 'Testing',
          status: 'PASSED',
        },
        {
          results: {},
          stage: 'Approval',
          status: 'PASSED',
        },
      ],
      status: 'DONE',
    },
    id: '123',
    solution: {
      attempt: {
        attemptId: 'ATTEMPT_ID',
        attempter: 'USER_ID',
        tests: [],
      },
      author: 'OTHER_USER_ID',
      jobId: 'JOB_ID',
      patchUrl: 'https://github.com/engi-network/website/pull/75',
      solutionId: 'SOLUTION_ID',
    },
    status: BitStatus.COMPLETE,
    userId: 'USER_ID',
  },
};

export const BusinessNotStarted: Story = {
  name: 'Business - Not started',
  args: {
    className: '',
    attemptCount: 0,
    created: '2023-05-24T19:51:12Z',
    creator: 'CREATOR_ID',
    currentUserSubmission: undefined,
    id: '123',
    solution: undefined,
    status: BitStatus.OPEN,
    userId: 'CREATOR_ID',
  },
};

export const BusinessInProgress: Story = {
  name: 'Business - In progress',
  args: {
    className: '',
    attemptCount: 10,
    created: '2023-05-24T19:51:12Z',
    creator: 'CREATOR_ID',
    currentUserSubmission: undefined,
    id: '123',
    solution: undefined,
    status: BitStatus.ACTIVE,
    userId: 'CREATOR_ID',
  },
};

export const BusinessCompleted: Story = {
  name: 'Business - Completed',
  args: {
    className: '',
    attemptCount: 10,
    created: '2023-05-24T19:51:12Z',
    creator: 'CREATOR_ID',
    currentUserSubmission: undefined,
    id: '123',
    solution: {
      attempt: {
        attemptId: 'ATTEMPT_ID',
        attempter: 'USER_ID',
        tests: [],
      },
      author: 'USER_ID',
      jobId: '123',
      patchUrl: 'https://github.com/engi-network/website/pull/75',
      solutionId: 'SOLUTION_ID',
    },
    status: BitStatus.COMPLETE,
    userId: 'CREATOR_ID',
  },
};
