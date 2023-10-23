import { gql } from 'graphql-request';
import {
  Bit,
  JobSubmissionsDetailsPagedQueryArguments,
  Submission,
} from '~/types';

export async function getBountyDetails(bitId): Promise<Bit> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/graphql`,
    {
      cache: 'no-store',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: gql`
          query BitDetails($bitId: UInt64!) {
            job(id: $bitId) {
              job {
                id
                creator
                funding
                repository {
                  url
                  branch
                  commit
                  readme
                  organization
                  name
                  fullName
                }
                technologies
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
                  pullRequestUrl
                  attempt {
                    attemptId
                    attempter
                    tests {
                      ...testAttempt
                    }
                  }
                }
                currentUserSubmissions {
                  status
                  attemptCreated
                  userInfo {
                    address
                    display
                    profileImageUrl
                    createdOn
                    createdJobsCount
                    solvedJobsCount
                  }
                  attemptId
                  attempt {
                    status
                    results {
                      identifier
                      stdout
                      stderr
                      returnCode
                    }
                    tests {
                      id
                      result
                      failedResultMessage
                    }
                  }
                  solve {
                    status
                    results {
                      solutionId
                      resultHash
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
                complexity {
                  sLOC
                  cyclomatic
                }
              }
              creatorUserInfo {
                address
                display
                profileImageUrl
                createdOn
                createdJobsCount
                solvedJobsCount
              }
            }
          }

          fragment test on Test {
            id
            result
            required
            failedResultMessage
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
          bitId,
        },
      }),
    }
  );

  const json = await response.json();
  const job = json.data.job;

  const bounty = { ...job.job, creatorUserInfo: job.creatorUserInfo };

  return bounty;
}

export async function getSubmissionDetails(submissionId): Promise<Submission> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/graphql`,
    {
      cache: 'no-store',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: gql`
          query SubmissionDetails($submissionId: UInt64!) {
            submission(id: $submissionId) {
              attemptId
              userInfo {
                address
                display
                profileImageUrl
                createdOn
                createdJobsCount
                solvedJobsCount
              }
              attempt {
                status
                tests {
                  id
                  result
                  failedResultMessage
                }
              }
              solve {
                status
                results {
                  solutionId
                  resultHash
                }
              }
            }
          }
        `,
        variables: {
          submissionId,
        },
      }),
    }
  );

  const json = await response.json();
  return json.data.submission;
}
export async function getSubmissions(
  query: JobSubmissionsDetailsPagedQueryArguments
) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/graphql`,
    {
      cache: 'no-store',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: gql`
        query BountySubmissions($skip: Int!, $limit: Int!) {
          submissions(query: { skip: $skip, limit: $limit, jobId: ${query.jobId} }) {
            items {
              attemptCreated
              status
              userInfo {
                address
                display
                profileImageUrl
                createdOn
                createdJobsCount
                solvedJobsCount
              }
              attemptId
              attempt {
                status
                results {
                  identifier
                  stdout
                  stderr
                  returnCode
                }
              }
              solve {
                status
                results {
                  solutionId
                  resultHash
                }
              }
            }
            totalCount
          }
        }
      `,
        variables: {
          skip: query.skip,
          limit: query.limit,
        },
      }),
    }
  );

  const json = await response.json();
  if (json.errors?.length > 0) {
    throw new Error(JSON.stringify(json.errors[0], undefined, '  '));
  }
  return json.data.submissions;
}
