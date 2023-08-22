import { gql } from 'graphql-request';

export async function getBountyDetails(bitId) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/graphql`,
    {
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
