import classNames from 'classnames';
import { gql } from 'graphql-request';
import { useRouter } from 'next/router';
import EmailSvg from 'public/img/signup/email.svg';
import { useEffect } from 'react';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';
import Button from '~/components/global/Button/Button';
import { sleep } from '~/utils';
import useAxios from '~/utils/hooks/useAxios';

type EmailConfirmationProps = {
  className?: string;
};

export default function EmailConfirmation({
  className,
}: EmailConfirmationProps) {
  const router = useRouter();
  const address = (router.query.address ?? '').toString();
  const email = (router.query.email ?? '').toString();

  // don't do initial request on page load if user is coming from register flow
  const initialSend =
    (router.query['initial-send'] ?? '').toString() === 'true';

  const { isLoading, mutate, isSuccess, isError } = useSendConfirmationEmail();

  useEffect(() => {
    if (address && email && initialSend) {
      mutate({ address, email });
    }
  }, [address, email, initialSend, mutate]);

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
        'max-w-page mt-16 mb-24 flex flex-col items-center text-center',
        className
      )}
    >
      <EmailSvg className="h-56 w-56" />
      <h1 className="font-grifter text-4xl mt-8">
        Confirming your email address
      </h1>
      <p className="font-bold text-lg text-secondary mt-8">
        {
          "Please check your email. If you didn't receive anything, click below to resend the email."
        }
      </p>
      <Button
        variant="primary"
        className="w-full tablet:w-auto tablet:!px-16 mt-8"
        inProgress={isLoading}
        onClick={() => mutate({ address, email })}
      >
        Resend Email
      </Button>
    </div>
  );
}

function useSendConfirmationEmail() {
  const axios = useAxios();
  return useMutation(
    ['sendConfirmationEmail'],
    async ({ address, email }: { address: string; email: string }) => {
      // TODO: implement once API is ready, and update signup to route to this page instead of success
      // https://linear.app/engi/issue/ENGIN-921/add-api-to-resend-confirmation-email
      // const { data } = await axios.post('/api/graphql', {
      //   query: gql`
      //     mutation SendConfirmationEmail($address: String!, $email: String!) {
      //       # TODO: ENGIN-921
      //     }
      //   `,
      //   variables: {
      //     email,
      //     address,
      //   },
      // });

      // if (data.errors?.length > 0) {
      //   throw new Error(
      //     data?.errors?.[0]?.message ?? 'Unable to check if accounts exist.'
      //   );
      // }

      await sleep(3000);
    }
  );
}
