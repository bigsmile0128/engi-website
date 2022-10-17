import React from 'react';
import classNames from 'classnames';
import JobTable from '../jobs/SearchResults/JobTable';
import { useQuery } from 'react-query';
import { JobsQueryArguments } from '~/types';
import axios from 'axios';
import { gql } from 'graphql-request';

type CreatedJobsTabProps = {
  className?: string;
  accountId: string;
};

export default function CreatedJobsTab({
  className,
  accountId,
}: CreatedJobsTabProps) {
  const { isLoading, data } = useQuery(['createdJobs', accountId], () =>
    fetchJobs({
      limit: 25,
      skip: 0,
      creator: accountId,
    })
  );
  return (
    <div className={classNames('flex flex-col', className)}>
      <JobTable isLoading={isLoading} data={data?.result?.items} />
    </div>
  );
}

async function fetchJobs(query: JobsQueryArguments) {
  const response = await axios.post('/api/graphql', {
    query: gql`
      query JobSearch($query: JobsQueryArguments!) {
        jobs(query: $query) {
          result {
            totalCount
            items {
              id
              creator
              funding
              repository {
                url
                branch
                commit
              }
              language
              name
              tests {
                ...test
              }
              requirements {
                isEditable
                isAddable
                isDeletable
              }
              solution {
                solutionId
                jobId
                author
                patchUrl
                attempt {
                  attemptId
                  attempter
                  tests {
                    ...testAttempt
                  }
                }
              }
              createdOn {
                ...blockReference
              }
              updatedOn {
                ...blockReference
              }
              status
              attemptCount
              solutionUserCount
              averageProgress {
                numerator
                denominator
              }
            }
          }
        }
      }

      fragment test on Test {
        id
        analysisResult
        required
      }

      fragment testAttempt on TestAttempt {
        id
        result
        failedResultMessage
      }

      fragment blockReference on BlockReference {
        number
        dateTime
      }
    `,
    variables: {
      query,
    },
  });
  return response.data?.data?.jobs ?? {};
}
