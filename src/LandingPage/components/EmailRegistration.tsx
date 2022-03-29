import React, { useEffect, useState } from 'react';
import { AiOutlineLoading } from 'react-icons/ai';
import axios, { AxiosError } from 'axios';
import { useMutation } from 'react-query';
import classNames from 'classnames';
import * as Sentry from '@sentry/react';

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

  const registerMutation = useMutation<any, AxiosError>(
    async (email) => {
      await axios.post('/api/contact', {
        contact_list_name: 'engi-newsletter',
        email,
      });
    },
    {
      onError: (error) => {
        if (error.response?.status !== 409) {
          console.log(error);
          Sentry.captureException(error, (scope) => {
            console.log(scope);
            scope.clear();
            scope.setTransactionName('POST /contact');
            scope.setTag('email', email);
            return scope;
          });
        }
      },
    }
  );

  const interestMutation = useMutation(async (interest) => {
    await axios.put('/api/contact', {
      contact_list_name: 'engi-newsletter',
      email,
      topics: [interest],
      attributes: {}, // server throws 500 if this is missing
    });
  });

  // only display modal if successful registration, otherwise display error
  useEffect(() => {
    setModalOpen(registerMutation.isSuccess);
  }, [registerMutation.isSuccess]);

  const onEmailSignup = async (email) => {
    registerMutation.mutate(email);
  };

  const onInterestClick = async (interest) => {
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
            'bg-transparent text-white border border-gray-500 p-4 text-sm flex-1 focus:outline-none focus:ring peer',
            inputClassName
          )}
          type="email"
          placeholder="Enter your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button
          type="submit"
          className="shrink-0 bg-gray-300 w-36 font-bold text-sm text-black hover:bg-gray-200 active:bg-gray-100 focus:outline-none focus:ring flex justify-center items-center z-10"
        >
          {!registerMutation.isLoading ? (
            'Get Notified'
          ) : (
            <AiOutlineLoading className="animate-spin text-lg" />
          )}
        </button>
      </form>
      {registerMutation.isError && (
        <p className="text-sm font-bold mt-2 -mb-7 text-red-500">
          {registerMutation.error?.response?.status === 409
            ? 'Your email is already subscribed.'
            : 'Error submitting email. Please try again.'}
        </p>
      )}
      <div
        className={classNames(
          'backdrop-blur-[10px] absolute top-0 right-0 bottom-0 left-0 z-10',
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
