import { gql } from 'graphql-request';
import { cookies } from 'next/headers';
import { CurrentUserInfo, Engineer } from '~/types';

export async function getCurrentUser(): Promise<CurrentUserInfo | null> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/graphql`,
    {
      cache: 'no-store',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Cookie: cookies().toString(),
      },
      body: JSON.stringify({
        query: gql`
          query CurrentUser {
            auth {
              currentUser {
                email
                display
                profileImageUrl
                freelancerSettings {
                  jobPreference
                }
                businessSettings {
                  companyName
                  preferredTechnologies
                }
                emailSettings {
                  weeklyNewsletter
                  jobAlerts
                  technicalUpdates
                }
                createdOn
                githubEnrollments {
                  installationId
                  createdOn
                  owner {
                    login
                    avatarUrl
                  }
                }
                balance
                wallet
              }
            }
          }
        `,
      }),
    }
  );

  const json = await response.json();
  if (json.errors?.length > 0 || !json.data.auth.currentUser) {
    return null;
  }

  return json.data.auth.currentUser;
}

export async function getUser(accountId): Promise<Engineer> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/graphql`,
    {
      cache: 'no-store',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Cookie: cookies().toString(),
      },
      body: JSON.stringify({
        query: gql`
          query AccountDetails($id: String!) {
            engineer(id: $id) {
              displayName
              profileImageUrl
              email
              balance
              bountiesSolved
              bountiesCreated
              earnings {
                pastDay
                pastWeek
                pastMonth
                lifetime
              }
              techologies
              repositoriesWorkedOn
              rootOrganization
            }
          }
        `,
        variables: {
          id: accountId,
        },
      }),
    }
  );

  const json = await response.json();
  if (json.errors?.length > 0) {
    throw new Error(JSON.stringify(json.errors[0], undefined, '  '));
  }

  // add account ID manually until it's added to schema
  // BLOCKED BY: https://github.com/engi-network/engi-blockchain-gql/issues/137
  return { ...json.data.engineer, address: accountId };
}

export async function getBalance(): Promise<string> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/graphql`,
    {
      cache: 'no-store',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Cookie: cookies().toString(),
      },
      body: JSON.stringify({
        query: gql`
          query UserBalance {
            auth {
              currentUser {
                balance
              }
            }
          }
        `,
      }),
    }
  );

  const json = await response.json();
  if (json.errors?.length > 0) {
    throw new Error(JSON.stringify(json.errors[0], undefined, '  '));
  }

  return json.data.auth.currentUser.balance;
}

export async function getWalletId(): Promise<string> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/graphql`,
    {
      cache: 'no-store',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Cookie: cookies().toString(),
      },
      body: JSON.stringify({
        query: gql`
          query UserWalletId {
            auth {
              currentUser {
                wallet
              }
            }
          }
        `,
      }),
    }
  );

  const json = await response.json();
  if (json.errors?.length > 0) {
    throw new Error(JSON.stringify(json.errors[0], undefined, '  '));
  }

  return json.data.auth.currentUser.wallet.Id;
}

// get presigned URL for uploading images to S3
export async function getPresignedUrl(contentType: string): Promise<string> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/graphql`,
    {
      cache: 'no-store',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Cookie: cookies().toString(),
      },
      body: JSON.stringify({
        query: gql`
          mutation getPresignedUrl($contentType: String!) {
            user {
              getProfileImagePreSignedUrl(contentType: $contentType)
            }
          }
        `,
        variables: {
          contentType,
        },
      }),
    }
  );

  const json = await response.json();
  if (json.errors?.length > 0) {
    throw new Error(JSON.stringify(json.errors[0], undefined, '  '));
  }

  return json.data.user.getProfileImagePreSignedUrl;
}
