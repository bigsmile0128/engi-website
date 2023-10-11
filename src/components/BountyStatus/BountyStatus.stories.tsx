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

// TODO: re-enable stories after schema is fully fleshed out
export const Placeholder: Story = {
  args: {
    data: undefined,
  },
};

// export const FreelancerNotStarted: Story = {
//   name: 'Freelancer - Not started',
//   args: {
//     className: '',
//     created: '2023-05-24T19:51:12Z',
//     creator: 'CREATOR_ID',
//     currentUserSubmission: undefined,
//     id: '123',
//     solution: undefined,
//     status: BitStatus.OPEN,
//     userId: 'USER_ID',
//   },
// };

// export const FreelancerAnalyzing: Story = {
//   name: 'Freelancer - Analyzing',
//   args: {
//     className: '',
//     created: '2023-05-24T19:51:12Z',
//     creator: 'CREATOR_ID',
//     currentUserSubmission: {
//       attemptCreated: '',
//       attempt: {
//         status: 'PASSED',
//         tests: [
//           {
//             id: 'test/test_demo.py::test_fail',
//             result: TestResult.PASSED,
//             failedResultMessage: '',
//             required: false,
//           },
//           {
//             id: 'test/test_demo.py::test_ok',
//             result: TestResult.PASSED,
//             failedResultMessage: '',
//             required: false,
//           },
//         ],
//       },
//       attemptId: 123,
//       userInfo: {
//         address: '123',
//         display: '123',
//       },
//       status: SubmissionStatus.ENGINE_ATTEMPTING,
//     },
//     id: '123',
//     solution: undefined,
//     status: BitStatus.ACTIVE,
//     userId: 'USER_ID',
//   },
// };

// export const FreelancerSubmission: Story = {
//   name: 'Freelancer - Submission',
//   args: {
//     className: '',
//     created: '2023-05-24T19:51:12Z',
//     creator: 'CREATOR_ID',
//     currentUserSubmission: {
//       attemptCreated: '',
//       attempt: {
//         status: 'PASSED',
//         tests: [
//           {
//             id: 'test/test_demo.py::test_fail',
//             result: TestResult.PASSED,
//             failedResultMessage: '',
//             required: false,
//           },
//           {
//             id: 'test/test_demo.py::test_ok',
//             result: TestResult.PASSED,
//             failedResultMessage: '',
//             required: false,
//           },
//         ],
//       },
//       attemptId: 123,
//       userInfo: {
//         address: '123',
//         display: '123',
//       },
//       status: SubmissionStatus.SOLVED_ON_CHAIN,
//     },
//     id: '123',
//     solution: undefined,
//     status: BitStatus.ACTIVE,
//     userId: 'USER_ID',
//   },
// };

// export const FreelancerCompleted: Story = {
//   name: 'Freelancer - Completed by user',
//   args: {
//     className: '',
//     created: '2023-05-24T19:51:12Z',
//     creator: 'CREATOR_ID',
//     currentUserSubmission: {
//       attemptCreated: '',
//       attempt: {
//         status: 'PASSED',
//         tests: [
//           {
//             id: 'test/test_demo.py::test_fail',
//             result: TestResult.PASSED,
//             failedResultMessage: '',
//             required: false,
//           },
//           {
//             id: 'test/test_demo.py::test_ok',
//             result: TestResult.PASSED,
//             failedResultMessage: '',
//             required: false,
//           },
//         ],
//       },
//       attemptId: 123,
//       userInfo: {
//         address: '123',
//         display: '123',
//       },
//       status: SubmissionStatus.SOLVED_ON_CHAIN,
//     },
//     id: '123',
//     solution: {
//       attempt: {
//         attemptId: 'ATTEMPT_ID',
//         attempter: 'USER_ID',
//         tests: [],
//       },
//       author: 'USER_ID',
//       jobId: 'JOB_ID',
//       patchUrl: 'https://github.com/engi-network/website/pull/75',
//       solutionId: 'SOLUTION_ID',
//     },
//     status: BitStatus.COMPLETE,
//     userId: 'USER_ID',
//   },
// };
// export const FreelancerCompletedOther: Story = {
//   name: 'Freelancer - Completed by another user',
//   args: {
//     className: '',
//     created: '2023-05-24T19:51:12Z',
//     creator: 'CREATOR_ID',
//     currentUserSubmission: {
//       attemptCreated: '',
//       attempt: {
//         status: 'PASSED',
//         tests: [
//           {
//             id: 'test/test_demo.py::test_fail',
//             result: TestResult.PASSED,
//             failedResultMessage: '',
//             required: false,
//           },
//           {
//             id: 'test/test_demo.py::test_ok',
//             result: TestResult.PASSED,
//             failedResultMessage: '',
//             required: false,
//           },
//         ],
//       },
//       attemptId: 123,
//       userInfo: {
//         address: '123',
//         display: '123',
//       },
//       status: SubmissionStatus.SOLVED_ON_CHAIN,
//     },
//     id: '123',
//     solution: {
//       attempt: {
//         attemptId: 'ATTEMPT_ID',
//         attempter: 'USER_ID',
//         tests: [],
//       },
//       author: 'OTHER_USER_ID',
//       jobId: 'JOB_ID',
//       patchUrl: 'https://github.com/engi-network/website/pull/75',
//       solutionId: 'SOLUTION_ID',
//     },
//     status: BitStatus.COMPLETE,
//     userId: 'USER_ID',
//   },
// };

// export const BusinessNotStarted: Story = {
//   name: 'Business - Not started',
//   args: {
//     className: '',
//     created: '2023-05-24T19:51:12Z',
//     creator: 'CREATOR_ID',
//     currentUserSubmission: undefined,
//     id: '123',
//     solution: undefined,
//     status: BitStatus.OPEN,
//     userId: 'CREATOR_ID',
//   },
// };

// export const BusinessInProgress: Story = {
//   name: 'Business - In progress',
//   args: {
//     className: '',
//     created: '2023-05-24T19:51:12Z',
//     creator: 'CREATOR_ID',
//     currentUserSubmission: undefined,
//     id: '123',
//     solution: undefined,
//     status: BitStatus.ACTIVE,
//     userId: 'CREATOR_ID',
//   },
// };

// export const BusinessCompleted: Story = {
//   name: 'Business - Completed',
//   args: {
//     className: '',
//     created: '2023-05-24T19:51:12Z',
//     creator: 'CREATOR_ID',
//     currentUserSubmission: undefined,
//     id: '123',
//     solution: {
//       attempt: {
//         attemptId: 'ATTEMPT_ID',
//         attempter: 'USER_ID',
//         tests: [],
//       },
//       author: 'USER_ID',
//       jobId: '123',
//       patchUrl: 'https://github.com/engi-network/website/pull/75',
//       solutionId: 'SOLUTION_ID',
//     },
//     status: BitStatus.COMPLETE,
//     userId: 'CREATOR_ID',
//   },
// };
