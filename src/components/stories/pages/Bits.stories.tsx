/* eslint-disable sort-keys */
import React from 'react';
import withMock from 'storybook-addon-mock';
import cn from 'classnames';
import styles from './common_bg.module.css';

import Bits from '../../../pages/bits';

export default {
  title: 'Pages/Bits Page',
  component: Bits,
  decorators: [withMock],
};

const Template = (args) => (
  <div className={cn('py-20', styles.main_bg)}>
    <Bits {...args} />
  </div>
);

export const Default = Template.bind({});

Default.args = {};

Default.parameters = {
  mockData: [
    {
      url: '/api/graphql',
      method: 'POST',
      status: 200,
      response: {
        data: {
          jobs: {
            items: [
              {
                creator: 'abc123',
                funding: 'abc123',
                id: 4,
                repository: {
                  url: 'xyz789',
                  branch: 'abc123',
                  commit: 'xyz789',
                },
                language: 'C_SHARP',
                name: 'xyz789',
                tests: [
                  {
                    id: 'abc123',
                    result: 'PASSED',
                    required: true,
                  },
                ],
                requirements: {
                  isEditable: 'xyz789',
                  isAddable: 'abc123',
                  isDeletable: 'xyz789',
                },
                solution: {
                  solutionId: 4,
                  jobId: 4,
                  author: 'abc123',
                  patchUrl: 'xyz789',
                  attempt: {
                    attemptId: 4,
                    attempter: 'xyz789',
                    tests: [
                      {
                        id: 'abc123',
                        result: 'PASSED',
                        required: true,
                      },
                    ],
                  },
                },
                attemptCount: 987,
                createdOn: {
                  number: 123123123,
                  dateTime: '2007-12-03T10:15:30Z',
                },
                updatedOn: {
                  number: 123123123,
                  dateTime: '2007-12-03T10:15:30Z',
                },
                status: 'OPEN',
              },
              {
                id: 41,
                creator: 'abc123s',
                funding: 'abc123s',
                repository: {
                  url: 'xyz789',
                  branch: 'abc123',
                  commit: 'xyz789',
                },
                language: 'C_SHARP',
                name: 'xyz789',
                tests: [
                  {
                    id: 'abc123',
                    result: 'PASSED',
                    required: true,
                  },
                ],
                requirements: {
                  isEditable: 'xyz789',
                  isAddable: 'abc123',
                  isDeletable: 'xyz789',
                },
                solution: {
                  solutionId: 4,
                  jobId: 4,
                  author: 'abc123',
                  patchUrl: 'xyz789',
                  attempt: {
                    attemptId: 4,
                    attempter: 'xyz789',
                    tests: [
                      {
                        id: 'abc123',
                        result: 'PASSED',
                        required: true,
                      },
                    ],
                  },
                },
                attemptCount: 987,
                createdOn: {
                  number: 1231231231,
                  dateTime: '2007-12-03T11:15:30Z',
                },
                updatedOn: {
                  number: 1231231231,
                  dateTime: '2007-12-03T11:15:30Z',
                },
                status: 'OPEN',
              },
            ],
            totalCount: 12,
          },
        },
      },
    },
  ],
};