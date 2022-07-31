import React, { useState } from 'react';
import { AiOutlineLoading } from '@react-icons/all-files/ai/AiOutlineLoading';
import axios, { AxiosError } from 'axios';
import { Mutation, useMutation } from 'react-query';
import classNames from 'classnames';
import * as Sentry from '@sentry/react';

import Button from 'components/Button';
import EmailModal from './EmailModal';
import { MdCheck } from '@react-icons/all-files/md/MdCheck';
import { MdErrorOutline } from '@react-icons/all-files/md/MdErrorOutline';

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
        attributes: {},
      });
    },
    {
      onError: (error) => {
        if (error.response?.status !== 409) {
          console.warn(error);
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

  const interestMutation = useMutation(
    async ({ interest, attributes = {} }: any) => {
      await axios.put('/api/contact', {
        contact_list_name: 'engi-newsletter',
        email,
        topics: [interest],
        attributes: attributes,
      });
    }
  );

  const onEmailSignup = async (email) => {
    registerMutation.mutate(email);
  };

  const onInterestClick = async (interest: string, attributes: any) => {
    interestMutation.mutate({ interest, attributes });
  };

  return (
    <div className={classNames('flex flex-col', className)}>
      <form
        // stack vertically on mobile devices
        className="flex flex-col xs:flex-row gap-y-6 xs:gap-y-0 w-full"
        onSubmit={(e) => {
          e.preventDefault();
          onEmailSignup(email);
        }}
      >
        <label htmlFor="email-address" className="sr-only">
          Email address
        </label>
        <div className="flex-1 relative">
          <input
            id="email-address"
            className={classNames(
              'w-full border border-white/30 xs:border-r-0 p-4 bg-[#232323]',
              'text-white placeholder:text-tertiary text-sm',
              'focus:outline-none focus:ring-1',
              registerMutation.isError
                ? 'border-red-400 fill-red-400 focus:ring-red-300 !bg-[#f8717122]'
                : '',
              inputClassName
            )}
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              registerMutation.reset();
            }}
            required
          />
          {registerMutation.isError && (
            <MdErrorOutline
              size={20}
              className="text-red-400 absolute right-4 top-1/2 -translate-y-1/2"
            />
          )}
        </div>
        <Button
          type="submit"
          className={classNames(
            'shrink-0 flex items-center justify-center w-full xs:w-40 z-10',
            {
              'bg-emerald-300 border-t-emerald-300': registerMutation.isSuccess,
            }
          )}
          disabled={registerMutation.isSuccess || registerMutation.isError}
        >
          {registerMutation.isLoading ? (
            <AiOutlineLoading className="animate-spin text-lg text-emerald-300" />
          ) : registerMutation.isSuccess ? (
            <div className="h-4 text-black">
              <MdCheck size={24} className="-my-1" />
            </div>
          ) : (
            <span>Get Notified</span>
          )}
        </Button>
      </form>
      {registerMutation.isError && (
        <p className="text-left text-xs mt-2 text-red-400">
          {registerMutation.error?.response?.status === 409
            ? 'This email is already registered. Please enter a different email.'
            : 'Error submitting email. Please try again.'}
        </p>
      )}
      {registerMutation.isSuccess && (
        <p className="text-left text-xs mt-2 flex flex-col gap-y-1">
          <span className="text-emerald-300">
            {"Success! You'll be notified."}
          </span>
          <span>
            Want more personalized updates?{' '}
            <button
              className="font-medium text-white underline hover:cursor-pointer hover:text-secondary"
              onClick={() => setModalOpen(true)}
            >
              Tell us more about you.
            </button>
          </span>
        </p>
      )}
      <div
        className={classNames(
          'backdrop-blur-[10px] absolute top-0 right-0 bottom-0 left-0 z-10',
          { hidden: !modalOpen, block: modalOpen }
        )}
      />
      <EmailModal
        isOpen={modalOpen}
        setIsOpen={setModalOpen}
        onInterestClick={onInterestClick}
      />
    </div>
  );
}
