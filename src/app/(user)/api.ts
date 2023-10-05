import { gql } from 'graphql-request';
import { cookies } from 'next/headers';
import { CurrentUserInfo } from '~/types';

export async function getCurrentUser(): Promise<CurrentUserInfo> {
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
  if (json.errors?.length > 0) {
    throw new Error(JSON.stringify(json.errors[0], undefined, '  '));
  }
  return json.data.auth.currentUser;
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
