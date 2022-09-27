import React, { useContext, useEffect, useMemo, useState } from 'react';
import classNames from 'classnames';
import { BiImport } from '@react-icons/all-files/bi/BiImport';
import * as bip39 from 'bip39';
import Link from 'next/link';
import { toast } from 'react-toastify';
import { useMutation, useQuery } from 'react-query';
import axios, { AxiosError } from 'axios';
import { gql } from 'graphql-request';
import { AiOutlineLoading3Quarters } from '@react-icons/all-files/ai/AiOutlineLoading3Quarters';
import { HiOutlineCheckCircle } from '@react-icons/all-files/hi/HiOutlineCheckCircle';
import { HiXCircle } from '@react-icons/all-files/hi/HiXCircle';
import UserContext from '~/utils/contexts/userContext';
import { isDev } from '~/utils';
import { useConnectPolkadotExtension } from '~/utils/polkadot/extension';
import { useRegisterUser } from '~/utils/auth/api';

type SignupProps = {
  className?: string;
};

enum Step {
  // the default step when arriving on the signup page
  SIGN_IN,
  // if a new user is registering for the first time
  SIGN_UP,
  FINISH_SIGN_UP,
}

export default function Signup({ className }: SignupProps) {
  const { setUser } = useContext(UserContext);
  const [currentStep, setCurrentStep] = useState(Step.SIGN_IN);
  const [mnemonic, setMnemonic] = useState('');
  const [confirmationWords, setConfirmationWords] = useState<string[]>([]);
  const [email, setEmail] = useState('');

  const {
    isLoading,
    isError,
    error,
    data: substrateAccounts,
  } = useConnectPolkadotExtension();

  const display = useMemo(
    () => substrateAccounts?.[0]?.meta?.name,
    [substrateAccounts]
  );

  const {
    mutate: register,
    isSuccess: registered,
    data: walletId,
  } = useRegisterUser();

  const { isLoading: isLoadingWallet, data: isValidWallet } = useQuery(
    ['wallet', walletId],
    () => isWalletValid(walletId)
  );

  useEffect(() => {
    // reset fields when going back to initial selection
    if (currentStep === Step.SIGN_IN) {
      setMnemonic('');
      setEmail('');
    }
  }, [currentStep]);

  useEffect(() => {
    if (registered) {
      setCurrentStep(Step.FINISH_SIGN_UP);
    }
  }, [registered]);

  // TODO: adjust padding and margin on mobile
  return (
    <div
      className={classNames(
        'max-w-page my-20 lg:!max-w-2xl',
        'bg-[#00000022] !p-12 rounded-lg',
        className
      )}
    >
      <div className="flex flex-col items-center">
        {currentStep === Step.SIGN_IN && (
          <>
            <h1 className="font-bold text-5xl mb-4">Welcome to Engi!</h1>
            <p className="mb-8">
              Where you’ll be able to browse millions of jobs, write code and
              get paid.
            </p>
            <p className="mb-8">{`We're happy to meet you!`}</p>
            <button
              className={classNames(
                'px-16 py-4 text-white font-bold',
                'bg-[#00000022] hover:bg-gray-700 active:bg-gray-600 border border-white outline-none focus-visible:ring-2'
              )}
              onClick={() => setCurrentStep(Step.NEW)}
            >
              Sign In
            </button>
            <button
              className={classNames(
                'px-16 py-4 text-white font-bold',
                'bg-[#00000022] hover:bg-gray-700 active:bg-gray-600 border border-white outline-none focus-visible:ring-2'
              )}
              onClick={() => setCurrentStep(Step.SIGN_UP)}
            >
              Sign Up
            </button>
          </>
        )}
        {currentStep === Step.SIGN_UP && (
          <>
            <h1 className="font-bold text-5xl mb-12">Register User</h1>
            <div className="flex flex-col gap-y-8 w-3/4 mb-12">
              <input
                className={classNames(
                  'w-full border border-gray-400 p-4 text-white placeholder:text-gray-300 outline-none focus-visible:ring-1 bg-transparent'
                )}
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                className={classNames(
                  'w-full border border-gray-400 p-4 text-white placeholder:text-gray-300 outline-none focus-visible:ring-1 bg-transparent'
                )}
                type="mnemonic"
                name="mnemonic"
                id="mnemonic"
                placeholder="Mnemonic"
                value={mnemonic}
                onChange={(e) => setMnemonic(e.target.value)}
              />
            </div>
            <div className="flex w-full gap-x-4">
              <button
                className={classNames(
                  'flex-1 py-4 text-white font-bold',
                  // TODO: change color for Back button
                  'bg-[#00000022] hover:bg-gray-700 active:bg-gray-600 border border-white outline-none focus-visible:ring-2'
                )}
                onClick={() => setCurrentStep(Step.SIGN_UP)}
              >
                Back
              </button>
              <button
                className={classNames(
                  'flex-1 py-4 text-white font-bold',
                  'bg-[#00000022] hover:bg-gray-700 active:bg-gray-600 border border-white outline-none focus-visible:ring-2'
                )}
                onClick={() => {
                  if (!display) {
                    toast.error('A display name is required.', {
                      position: 'top-center',
                      autoClose: 3000,
                    });
                  } else if (!email) {
                    toast.error('An email is required.', {
                      position: 'top-center',
                      autoClose: 3000,
                    });
                  } else if (!mnemonic) {
                    toast.error(
                      'A mnemonic is required to register. This is not sent over the wire.',
                      {
                        position: 'top-center',
                        autoClose: 3000,
                      }
                    );
                  } else {
                    register({
                      display,
                      email,
                      mnemonic,
                    });
                  }
                }}
              >
                Create
              </button>
            </div>
          </>
        )}
        {currentStep === Step.FINISH_SIGN_UP && (
          <>
            <h1 className="font-bold text-5xl mb-4">Congratulations!</h1>
            <p className="mb-8">
              {`You've set up your wallet. You can start working on Engi jobs.`}
            </p>
            <p className="mb-8">{`We're happy to meet you!`}</p>
            <Link href={isDev() ? '/jobs' : '/'}>
              <a>
                <button
                  className={classNames(
                    'px-16 py-4 text-white font-bold',
                    'bg-[#00000022] hover:bg-gray-700 active:bg-gray-600 border border-white outline-none focus-visible:ring-2'
                  )}
                >
                  Finish
                </button>
              </a>
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

async function isWalletValid(walletId): Promise<boolean> {
  if (!walletId) {
    return false;
  }
  const { data } = await axios.post('/api/graphql', {
    query: gql`
      query WalletCheckQuery($id: ID!) {
        account(id: $id) {
          data {
            free
          }
        }
      }
    `,
    variables: {
      id: walletId,
    },
    operationName: 'WalletCheckQuery',
  });

  return !!data.data.account;
}
