import { gql } from 'graphql-request';
import { Draft } from '~/types';
import { cookies } from 'next/headers';

const draftFragment = gql`
  fragment draft on JobDraft {
    id
    tests
    isAddable
    isEditable
    isDeletable
    funding
    name
    analysis {
      id
      repositoryUrl
      branch
      commit
      createdOn
      createdBy
      status
      technologies
      directoryEntries
      complexity {
        sLOC
        cyclomatic
      }
      tests {
        id
        result
        failedResultMessage
      }
      executionResult {
        identifier
        stdout
        stderr
        returnCode
      }
      processedOn
    }
  }
`;

export async function getDraftDetails(draftId): Promise<Draft> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/graphql`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: gql`
          ${draftFragment}
          query DraftDetails($draftId: String!) {
            draft(id: $draftId) {
              ...draft
            }
          }
        `,
        variables: {
          draftId,
        },
      }),
    }
  );

  const json = await response.json();
  if (json.errors?.length > 0) {
    throw new Error(JSON.stringify(json.errors[0], undefined, '  '));
  }
  return json.data.draft;
}

export async function getDrafts(): Promise<Draft[]> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/graphql`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Cookie: cookies().toString(),
      },
      body: JSON.stringify({
        query: gql`
          ${draftFragment}
          query UserDrafts {
            drafts(args: { skip: 0, take: 50 }) {
              ...draft
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
  return json.data.drafts;
}

export async function getBalance(): Promise<string> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/graphql`,
    {
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
