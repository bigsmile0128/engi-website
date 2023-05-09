'use client';

import classNames from 'classnames';
import { gql } from 'graphql-request';
import { useSearchParams } from 'next/navigation';
import EmailSvg from 'public/img/signup/email.svg';
import { useEffect } from 'react';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';
import Button from '~/components/global/Button/Button';
import useAxios from '~/utils/hooks/useAxios';

export default function EmailPage() {
  const searchParams = useSearchParams();
  const address = searchParams?.get('address') ?? '';

  // don't do initial request on page load if user is coming from register flow
  const initialSend =
    (searchParams?.get('initial-send') ?? '').toString() === 'true';

  const { isLoading, mutate, isSuccess, isError } = useSendConfirmationEmail();

  useEffect(() => {
    if (address && initialSend) {
      mutate(address);
    }
  }, [address, initialSend, mutate]);

  useEffect(() => {
    if (isSuccess) {
      toast.success('Successfully sent confirmation email.');
    } else if (isError) {
      toast.error('Failed to send confirmation email.');
    }
  }, [isSuccess, isError]);

  return (
    <div
      className={classNames(
        'max-w-md mx-auto mt-16 mb-24 flex flex-col items-center text-center tablet:py-24'
      )}
    >
      <EmailSvg className="h-56 w-56" />
      <h1 className="font-grifter text-4xl mt-8">Verify your email</h1>
      <p className="text-lg text-secondary mt-8">
        Verify your email address to complete the wallet setup with Engi
      </p>
      <Button
        variant="primary"
        className="w-full tablet:w-auto tablet:!px-16 mt-12"
        inProgress={isLoading}
        onClick={() => mutate(address)}
      >
        Resend Email
      </Button>
    </div>
  );
}

function useSendConfirmationEmail() {
  const axios = useAxios();
  return useMutation(['sendConfirmationEmail'], async (address: string) => {
    const { data } = await axios.post('/api/graphql', {
      query: gql`
        mutation ResendEmailConfirmation($address: String!) {
          auth {
            resendEmailConfirmation(address: $address)
          }
        }
      `,
      variables: {
        address,
      },
    });

    if (data.errors?.length > 0) {
      throw new Error(
        data?.errors?.[0]?.message ?? 'Unable to check if accounts exist.'
      );
    }
  });
}
