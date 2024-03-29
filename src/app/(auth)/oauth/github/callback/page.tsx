'use client';

import classNames from 'classnames';
import { gql } from 'graphql-request';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import {
  RiCheckboxCircleLine,
  RiErrorWarningLine,
  RiLoader3Line,
} from 'react-icons/ri';
import { useMutation } from 'react-query';
import Button from '~/components/global/Button/Button';
import { GraphQlError } from '~/utils/GraphQlError';
import useAxios from '~/utils/hooks/useAxios';

export default function GithubCallback() {
  const searchParams = useSearchParams();
  const code = searchParams?.get('code') ?? '';
  const installationId = searchParams?.get('installation_id') ?? '';

  const mutation = useGithubCallback();

  useEffect(() => {
    if (code && installationId) {
      mutation.mutate({
        code: code as string,
        installationId: installationId as string,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code, installationId]);

  return (
    <div className={classNames('max-w-page flex mt-16 mb-24')}>
      {mutation.isLoading ? (
        <div className="flex-1 flex flex-col items-center gap-8">
          <RiLoader3Line className="text-8xl animate-spin" />
          <span className="font-medium text-3xl">Loading...</span>
        </div>
      ) : mutation.isError ? (
        <div className="flex-1 flex flex-col items-center gap-8">
          <RiErrorWarningLine className="text-8xl text-red-400" />
          <span className="font-medium text-3xl">
            Error enrolling GitHub repository.
          </span>
        </div>
      ) : mutation.isSuccess ? (
        <div className="flex-1 flex flex-col items-center gap-8">
          <RiCheckboxCircleLine className="text-8xl text-green-primary" />
          <span className="font-medium text-3xl">
            Successfully added repository.
          </span>
          <Link href="/hire">
            <Button variant="primary">Post a Bounty</Button>
          </Link>
        </div>
      ) : null}
    </div>
  );
}

type GithubEnrollmentArgs = {
  code: string;
  installationId: string;
};

function useGithubCallback() {
  const axios = useAxios();
  return useMutation<void, any, GithubEnrollmentArgs>(
    ['githubEnrollment'],
    async ({ code, installationId }) => {
      try {
        await axios.post('/api/graphql', {
          query: gql`
            mutation GithubEnrollment(
              $code: String!
              $installationId: String!
            ) {
              github {
                enroll(args: { code: $code, installationId: $installationId })
              }
            }
          `,
          variables: {
            code,
            installationId,
          },
        });
      } catch (error) {
        console.error(error);
        throw new GraphQlError(
          'Unable to enroll Github repositories.',
          error.response?.data?.errors?.[0]?.extensions?.code
        );
      }
    }
  );
}
