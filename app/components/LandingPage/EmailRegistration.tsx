import React, { useEffect, useState } from 'react';
import { AiOutlineLoading } from 'react-icons/ai';
import axios, { AxiosError } from 'axios';
import { useMutation } from 'react-query';
import classNames from 'classnames';
import * as Sentry from '@sentry/react';

import Button from '~/components/Button';
import EmailModal from './EmailModal';

interface EmailRegistrationProps {
  className?: string;
  inputClassName?: string;
}

export default function EmailRegistration({
  className,
  inputClassName,
}: EmailRegistrationProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [email, setEmail] = useState('');

  const registerMutation = useMutation<any, AxiosError, string>(
    async (email) => {
      await axios.post('/api/contact', {
        contact_list_name: 'engi-newsletter',
        email,
        attributes: {},
      });
    },
    {
      onError: (error) => {
        if (error.response?.status !== 409) {
          console.log(error);
          Sentry.captureException(error, (scope) => {
            scope.clear();
            scope.setTransactionName('POST /contact');
            scope.setTag('email', email);
            return scope;
          });
        }
      },
    }
  );

  const interestMutation = useMutation<any, AxiosError, string>(
    async (interest) => {
      await axios.put('/api/contact', {
        contact_list_name: 'engi-newsletter',
        email,
        topics: [interest],
        attributes: {}, // server throws 500 if this is missing
      });
    }
  );

  // only display modal if successful registration, otherwise display error
  useEffect(() => {
    setModalOpen(registerMutation.isSuccess);
  }, [registerMutation.isSuccess]);

  const onEmailSignup = async (email: string) => {
    registerMutation.mutate(email);
  };

  const onInterestClick = async (interest: string) => {
    interestMutation.mutate(interest);
  };

  return (
    <div className={classNames('flex flex-col', className)}>
      <form
        className="flex w-full"
        onSubmit={(e) => {
          e.preventDefault();
          onEmailSignup(email);
        }}
      >
        <label htmlFor="email-address" className="sr-only">
          Email address
        </label>
        <input
          id="email-address"
          className={classNames(
            'peer flex-1 border border-gray-500 bg-transparent p-4 text-sm text-white focus:outline-none focus:ring',
            inputClassName
          )}
          type="email"
          placeholder="Enter your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Button type="submit" className="z-10 shrink-0 px-8">
          {!registerMutation.isLoading ? (
            'Get Notified'
          ) : (
            <AiOutlineLoading className="animate-spin text-lg" />
          )}
        </Button>
      </form>
      {registerMutation.isError && (
        <p className="mt-2 -mb-7 text-sm font-bold text-red-500">
          {registerMutation.error?.response?.status === 409
            ? 'Your email is already subscribed.'
            : 'Error submitting email. Please try again.'}
        </p>
      )}
      <div
        className={classNames(
          'absolute top-0 right-0 bottom-0 left-0 z-10 backdrop-blur-[10px]',
          { hidden: !modalOpen, block: modalOpen }
        )}
      />
      <EmailModal
        open={modalOpen}
        setOpen={setModalOpen}
        onInterestClick={onInterestClick}
      />
    </div>
  );
}
