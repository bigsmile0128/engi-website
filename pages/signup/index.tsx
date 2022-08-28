import React, { useContext, useEffect, useState } from 'react';
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
import UserContext from 'utils/contexts/userContext';
import { isDev } from 'utils';

type SignupProps = {
  className?: string;
};

enum Step {
  WELCOME,
  NEW,
  IMPORT_WALLET,
  CREATE_WALLET,
  CONFIRM_WALLET,
  USERNAME,
  PASSWORD,
  FINISH,
}

export default function Signup({ className }: SignupProps) {
  const { setUser } = useContext(UserContext);
  const [currentStep, setCurrentStep] = useState(Step.WELCOME);
  const [passphrase, setPassphrase] = useState('');
  const [mnemonic, setMnemonic] = useState('');
  const [confirmationWords, setConfirmationWords] = useState<string[]>([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmationPassword, setConfirmationPassword] = useState('');
  const [walletId, setWalletId] = useState('');

  const registerMutation = useMutation<any, AxiosError, any>(
    async (userObj: any) => {
      const response = await axios.post('/api/graphql', {
        query: gql`
          mutation CreateUser(
            $name: String!
            $mnemonic: String!
            $mnemonicSalt: String!
            $password: String!
          ) {
            createUser(
              user: {
                name: $name
                mnemonic: $mnemonic
                mnemonicSalt: $mnemonicSalt
                password: $password
              }
            ) {
              name
              address
              createdOn
              encoded
              metadata {
                content
                type
                version
              }
            }
          }
        `,
        operationName: 'CreateUser',
        variables: {
          name: userObj.username,
          password: userObj.password,
          mnemonic: userObj.mnemonic,
          mnemonicSalt: userObj.passphrase,
        },
      });
      const walletId = response.data?.data?.createUser?.address;
      if (walletId) {
        if (typeof window !== undefined) {
          window.gtag('event', 'create_wallet', { walletId });
        }

        setUser({
          walletId,
        });
      }
    }
  );

  const { isLoading: isLoadingWallet, data: isValidWallet } = useQuery(
    ['wallet', walletId],
    () => isWalletValid(walletId)
  );

  useEffect(() => {
    // reset fields when going back to initial selection
    if (currentStep === Step.NEW) {
      setPassphrase('');
      setMnemonic('');
    }
  }, [currentStep]);

  useEffect(() => {
    if (registerMutation.isSuccess) {
      setCurrentStep(Step.FINISH);
    }
  }, [registerMutation.isSuccess]);

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
        {currentStep === Step.WELCOME && (
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
              Get Started
            </button>
          </>
        )}
        {currentStep === Step.NEW && (
          <>
            <h1 className="font-bold text-5xl mb-8">New to Engi?</h1>
            <div className="flex flex-col sm:flex-row gap-8">
              <div className="flex flex-col gap-y-2 border border-gray-300 p-8 w-50 h-64">
                <BiImport className="text-4xl" />
                <span className="text-sm font-bold">
                  No, I already have a wallet
                </span>
                <span className="text-sm">Import your existing wallet</span>
                <button
                  className={classNames(
                    'w-full py-4 text-white font-bold mt-auto',
                    'bg-[#00000022] hover:bg-gray-700 active:bg-gray-600 border border-white outline-none focus-visible:ring-2'
                  )}
                  onClick={() => setCurrentStep(Step.IMPORT_WALLET)}
                >
                  Import Wallet
                </button>
              </div>
              <div className="flex flex-col gap-y-2 border border-gray-300 p-8 w-50 h-64">
                <BiImport className="text-4xl" />
                <span className="text-sm font-bold">Yes, set me up!</span>
                <span className="text-sm">This will create your wallet</span>
                <button
                  className={classNames(
                    'w-full py-4 text-white font-bold mt-auto',
                    'bg-[#00000022] hover:bg-gray-700 active:bg-gray-600 border border-white outline-none focus-visible:ring-2'
                  )}
                  onClick={() => {
                    setMnemonic(bip39.generateMnemonic());
                    setCurrentStep(Step.CREATE_WALLET);
                  }}
                >
                  Create Wallet
                </button>
              </div>
            </div>
          </>
        )}
        {currentStep === Step.IMPORT_WALLET && (
          <>
            <h1 className="font-bold text-5xl mb-8">Import Wallet</h1>
            <div className="relative w-full mb-8">
              <input
                className={classNames(
                  'w-full p-4 pr-8',
                  'border border-gray-400 text-white placeholder:text-gray-300 outline-none focus-visible:ring-2 bg-transparent'
                )}
                type="text"
                name="wallet"
                id="wallet"
                placeholder="Wallet ID"
                value={walletId}
                onChange={(e) => setWalletId(e.target.value)}
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2">
                {isLoadingWallet ? (
                  <AiOutlineLoading3Quarters className="text-lg animate-spin text-gray-400 mr-1" />
                ) : isValidWallet ? (
                  <HiOutlineCheckCircle className="text-2xl text-green-primary" />
                ) : walletId && !isValidWallet ? (
                  <HiXCircle className="text-2xl text-red-400" />
                ) : null}
              </div>
            </div>
            <div className="flex w-full gap-x-4">
              <button
                className={classNames(
                  'flex-1 py-4 text-white font-bold',
                  // TODO: change color for Back button
                  'bg-[#00000022] hover:bg-gray-700 active:bg-gray-600 border border-white outline-none focus-visible:ring-2'
                )}
                onClick={() => setCurrentStep(Step.NEW)}
              >
                Back
              </button>
              <button
                className={classNames(
                  'flex-1 py-4 text-white font-bold',
                  'bg-[#00000022] hover:bg-gray-700 active:bg-gray-600 border border-white outline-none focus-visible:ring-2'
                )}
                onClick={() => {
                  // TODO: validate wallet?
                  setCurrentStep(Step.FINISH);
                  setUser({ walletId });
                }}
              >
                Next
              </button>
            </div>
          </>
        )}
        {currentStep === Step.CREATE_WALLET && (
          <>
            <h1 className="font-bold text-5xl mb-4">Secret Backup Phrase</h1>
            <p className="text-sm mb-8 w-3/4 text-center">
              Your secret backup phrase makes it easy to restore your account if
              you ever need to do so.
            </p>
            <p className="text-sm mb-8 w-3/4 text-center">
              Write this phrase on a piece of paper and store it in a secure
              location.
            </p>
            <div className="border border-white p-8 px-16 text-center text-lg mb-8">
              {mnemonic}
            </div>
            <div className="flex w-full gap-x-4">
              <button
                className={classNames(
                  'flex-1 py-4 text-white font-bold',
                  // TODO: change color for Back button
                  'bg-[#00000022] hover:bg-gray-700 active:bg-gray-600 border border-white outline-none focus-visible:ring-2'
                )}
                onClick={() => setCurrentStep(Step.NEW)}
              >
                Back
              </button>
              <button
                className={classNames(
                  'flex-1 py-4 text-white font-bold',
                  'bg-[#00000022] hover:bg-gray-700 active:bg-gray-600 border border-white outline-none focus-visible:ring-2'
                )}
                onClick={() => {
                  setCurrentStep(Step.CONFIRM_WALLET);
                }}
              >
                Next
              </button>
            </div>
          </>
        )}
        {currentStep === Step.CONFIRM_WALLET && (
          <>
            <h1 className="font-bold text-5xl mb-4 text-center">
              Confirm Your Secret Backup Phrase
            </h1>
            <p className="text-sm mb-8 w-3/4 text-center">
              Please select each word in order to confirm your secret phrase.
            </p>
            <div className="w-full flex items-start flex-wrap gap-4 border border-white min-h-[132px] p-4 text-center text-lg mb-8">
              {confirmationWords.map((wordId) => (
                // TODO: add entrance/exit animations
                <button
                  key={wordId}
                  className={classNames(
                    'text-sm px-4 py-2',
                    'bg-[#ffffff22] outline-none focus-visible:ring-2'
                  )}
                  onClick={() =>
                    setConfirmationWords(
                      confirmationWords.filter((wi) => wi !== wordId)
                    )
                  }
                >
                  {wordId.replace(/[^A-Za-z]/g, '')}
                </button>
              ))}
            </div>
            {/* <input
              className={classNames(
                'mb-8 w-full border border-gray-400 p-4 text-white placeholder:text-gray-300 outline-none focus-visible:ring-1 bg-transparent'
              )}
              type="password"
              name="passphrase"
              id="passphrase"
              placeholder="Confirm Passphrase"
              value={confirmationPassphrase}
              onChange={(e) => setConfirmationPassphrase(e.target.value)}
            /> */}
            <div
              className={classNames(
                'w-full grid gap-x-12 gap-y-4 mb-8',
                'grid-cols-2',
                'sm:grid-cols-4'
              )}
            >
              {mnemonic
                .split(' ')
                .sort()
                .map((word, i) => {
                  const wordId = word + i;

                  return (
                    <button
                      key={wordId}
                      className={classNames(
                        'flex-1 py-2 text-white text-sm',
                        'bg-[#00000022] hover:bg-gray-700 active:bg-gray-600 outline-none focus-visible:ring-2',
                        confirmationWords.includes(wordId)
                          ? '!bg-[#ffffff22]'
                          : ''
                      )}
                      onClick={() => {
                        let newConfirmationWords: string[];
                        if (confirmationWords.includes(wordId)) {
                          newConfirmationWords = confirmationWords.filter(
                            (wi) => wi !== wordId
                          );
                        } else {
                          newConfirmationWords = [...confirmationWords, wordId];
                        }
                        setConfirmationWords(newConfirmationWords);
                      }}
                    >
                      {word}
                    </button>
                  );
                })}
            </div>
            <div className="flex w-full gap-x-4">
              <button
                className={classNames(
                  'flex-1 py-4 text-white font-bold',
                  // TODO: change color for Back button
                  'bg-[#00000022] hover:bg-gray-700 active:bg-gray-600 border border-white outline-none focus-visible:ring-2'
                )}
                onClick={() => setCurrentStep(Step.CREATE_WALLET)}
              >
                Back
              </button>
              <button
                className={classNames(
                  'flex-1 py-4 text-white font-bold',
                  'bg-[#00000022] hover:bg-gray-700 active:bg-gray-600 border border-white outline-none focus-visible:ring-2'
                )}
                onClick={() => {
                  if (
                    confirmationWords
                      .map((wi) => wi.replace(/[^A-Za-z]/g, ''))
                      .join(' ') !== mnemonic
                  ) {
                    toast.error('The secret backup phrase does not match.', {
                      position: 'top-center',
                      autoClose: 3000,
                    });
                    // } else if (confirmationPassphrase !== passphrase) {
                    //   toast.error('The passphrase does not match.', {
                    //     position: 'top-center',
                    //     autoClose: 3000,
                    //   });
                  } else {
                    setCurrentStep(Step.USERNAME);
                  }
                }}
              >
                Next
              </button>
            </div>
          </>
        )}
        {currentStep === Step.USERNAME && (
          <>
            <h1 className="font-bold text-5xl mb-12">Create User</h1>
            <div className="flex flex-col gap-y-8 w-3/4 mb-12">
              <input
                className={classNames(
                  'w-full border border-gray-400 p-4 text-white placeholder:text-gray-300 outline-none focus-visible:ring-1 bg-transparent'
                )}
                type="text"
                name="username"
                id="username"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <input
                className={classNames(
                  'w-full border border-gray-400 p-4 text-white placeholder:text-gray-300 outline-none focus-visible:ring-1 bg-transparent'
                )}
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <input
                className={classNames(
                  'w-full border border-gray-400 p-4 text-white placeholder:text-gray-300 outline-none focus-visible:ring-1 bg-transparent'
                )}
                type="password"
                name="password-confirmation"
                id="password-confirmation"
                placeholder="Confirm Password"
                value={confirmationPassword}
                onChange={(e) => setConfirmationPassword(e.target.value)}
              />
            </div>
            <div className="flex w-full gap-x-4">
              <button
                className={classNames(
                  'flex-1 py-4 text-white font-bold',
                  // TODO: change color for Back button
                  'bg-[#00000022] hover:bg-gray-700 active:bg-gray-600 border border-white outline-none focus-visible:ring-2'
                )}
                onClick={() => setCurrentStep(Step.CONFIRM_WALLET)}
              >
                Back
              </button>
              <button
                className={classNames(
                  'flex-1 py-4 text-white font-bold',
                  'bg-[#00000022] hover:bg-gray-700 active:bg-gray-600 border border-white outline-none focus-visible:ring-2'
                )}
                onClick={() => {
                  if (!username) {
                    toast.error('A username is required.', {
                      position: 'top-center',
                      autoClose: 3000,
                    });
                  } else if (!password) {
                    toast.error('A password is required.', {
                      position: 'top-center',
                      autoClose: 3000,
                    });
                  } else if (confirmationPassword !== password) {
                    toast.error('The confirmation password does not match.', {
                      position: 'top-center',
                      autoClose: 3000,
                    });
                  } else {
                    registerMutation.mutate({
                      username,
                      password,
                      mnemonic,
                      passphrase,
                    });
                  }
                }}
              >
                Create
              </button>
            </div>
          </>
        )}
        {currentStep === Step.FINISH && (
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
