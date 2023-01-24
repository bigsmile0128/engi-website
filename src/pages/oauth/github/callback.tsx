import React, { useEffect } from 'react';
import classNames from 'classnames';
import { useRouter } from 'next/router';
import { useMutation } from 'react-query';
import { gql } from 'graphql-request';
import useAxios from '~/utils/hooks/useAxios';
import {
  RiCheckboxCircleLine,
  RiErrorWarningLine,
  RiLoader3Line,
} from 'react-icons/ri';
import Button from '~/components/global/Button/Button';
import Link from 'next/link';

type GithubCallbackProps = {
  className?: string;
};

export default function GithubCallback({ className }: GithubCallbackProps) {
  const { query } = useRouter();
  const { code, installation_id: installationId } = query;

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
    <div className={classNames('max-w-page flex mt-16 mb-24', className)}>
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
            <Button variant="primary">Post a Bit</Button>
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

export function useGithubCallback() {
  const axios = useAxios();
  return useMutation<void, any, GithubEnrollmentArgs>(
    ['githubEnrollment'],
    async ({ code, installationId }) => {
      const { data } = await axios.post('/api/graphql', {
        query: gql`
          mutation GithubEnrollment($code: String!, $installationId: String!) {
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

      if (data.errors?.length > 0) {
        throw new Error(
          data?.errors?.[0]?.message ?? 'Unable to enroll Github repositories.'
        );
      }
    }
  );
}
