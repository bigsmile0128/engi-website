import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { BiImport } from 'react-icons/bi';
import * as bip39 from 'bip39';
import Link from 'next/link';
import { toast } from 'react-toastify';
import { useMutation } from 'react-query';
import axios, { AxiosError } from 'axios';
import { gql } from 'graphql-request';

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
  const [currentStep, setCurrentStep] = useState(Step.WELCOME);
  const [passphrase, setPassphrase] = useState('');
  const [mnemonic, setMnemonic] = useState('');
  const [confirmationWords, setConfirmationWords] = useState<string[]>([]);
  const [confirmationPassphrase, setConfirmationPassphrase] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmationPassword, setConfirmationPassword] = useState('');

  const registerMutation = useMutation<any, AxiosError, any>(
    async (userObj: any) => {
      await axios.post('/api/graphql', {
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
    }
  );

  useEffect(() => {
    // reset fields when going back to initial seelction
    if (currentStep === Step.NEW) {
      setPassphrase('');
      setMnemonic('');
    }
  }, [currentStep]);

  useEffect(() => {
    if (registerMutation.isSuccess) {
      console.log('registerMutation.isSuccess', registerMutation.isSuccess);
      setCurrentStep(Step.FINISH);
    }
  }, [registerMutation.isSuccess]);

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
                'bg-[#00000022] hover:bg-gray-700 active:bg-gray-600 border border-white outline-none focus:ring-2'
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
                    'bg-[#00000022] hover:bg-gray-700 active:bg-gray-600 border border-white outline-none focus:ring-2'
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
                    'bg-[#00000022] hover:bg-gray-700 active:bg-gray-600 border border-white outline-none focus:ring-2'
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
            <h1 className="font-bold text-5xl mb-8">Secret Backup Phrase</h1>
            <textarea
              className={classNames(
                'w-full mb-8 border border-gray-400 p-4 text-white placeholder:text-gray-300 text-sm focus:outline-none focus:ring-1 bg-transparent'
              )}
              value={mnemonic}
              onChange={(e) => setMnemonic(e.target.value.trim())}
              placeholder="Secret Backup Phrase"
            />
            <input
              className={classNames(
                'mb-8 w-full border border-gray-400 p-4 text-white placeholder:text-gray-300 focus:outline-none focus:ring-1 bg-transparent'
              )}
              type="password"
              name="passphrase"
              id="passphrase"
              placeholder="Passphrase"
              value={passphrase}
              onChange={(e) => setPassphrase(e.target.value)}
            />
            <div className="flex w-full gap-x-4">
              <button
                className={classNames(
                  'flex-1 py-4 text-white font-bold',
                  // TODO: change color for Back button
                  'bg-[#00000022] hover:bg-gray-700 active:bg-gray-600 border border-white outline-none focus:ring-2'
                )}
                onClick={() => setCurrentStep(Step.NEW)}
              >
                Back
              </button>
              <button
                className={classNames(
                  'flex-1 py-4 text-white font-bold',
                  'bg-[#00000022] hover:bg-gray-700 active:bg-gray-600 border border-white outline-none focus:ring-2'
                )}
                onClick={() => {
                  if (!mnemonic) {
                    toast.error('A secret backup phrase is required.', {
                      position: 'top-center',
                      autoClose: 3000,
                    });
                  } else if (!passphrase) {
                    toast.error('A passphrase is required.', {
                      position: 'top-center',
                      autoClose: 3000,
                    });
                  } else {
                    setCurrentStep(Step.CREATE_WALLET);
                  }
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
            <input
              className={classNames(
                'mb-8 w-full border border-gray-400 p-4 text-white placeholder:text-gray-300 focus:outline-none focus:ring-1 bg-transparent'
              )}
              type="password"
              name="passphrase"
              id="passphrase"
              placeholder="Passphrase"
              value={passphrase}
              onChange={(e) => setPassphrase(e.target.value)}
            />
            <div className="flex w-full gap-x-4">
              <button
                className={classNames(
                  'flex-1 py-4 text-white font-bold',
                  // TODO: change color for Back button
                  'bg-[#00000022] hover:bg-gray-700 active:bg-gray-600 border border-white outline-none focus:ring-2'
                )}
                onClick={() => setCurrentStep(Step.NEW)}
              >
                Back
              </button>
              <button
                className={classNames(
                  'flex-1 py-4 text-white font-bold',
                  'bg-[#00000022] hover:bg-gray-700 active:bg-gray-600 border border-white outline-none focus:ring-2'
                )}
                onClick={() => {
                  if (!passphrase) {
                    toast.error('A passphrase is required.', {
                      position: 'top-center',
                      autoClose: 3000,
                    });
                  } else {
                    setCurrentStep(Step.CONFIRM_WALLET);
                  }
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
              {confirmationWords.map((word) => (
                // TODO: add entrance/exit animations
                <button
                  key={word}
                  className={classNames(
                    'text-sm px-4 py-2',
                    'bg-[#ffffff22] outline-none focus:ring-2'
                  )}
                  onClick={() =>
                    setConfirmationWords(
                      confirmationWords.filter((w) => w !== word)
                    )
                  }
                >
                  {word}
                </button>
              ))}
            </div>
            <input
              className={classNames(
                'mb-8 w-full border border-gray-400 p-4 text-white placeholder:text-gray-300 focus:outline-none focus:ring-1 bg-transparent'
              )}
              type="password"
              name="passphrase"
              id="passphrase"
              placeholder="Confirm Passphrase"
              value={confirmationPassphrase}
              onChange={(e) => setConfirmationPassphrase(e.target.value)}
            />
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
                .map((word) => (
                  <button
                    key={word}
                    className={classNames(
                      'flex-1 py-2 text-white text-sm',
                      'bg-[#00000022] hover:bg-gray-700 active:bg-gray-600 outline-none focus:ring-2',
                      confirmationWords.includes(word) ? '!bg-[#ffffff22]' : ''
                    )}
                    onClick={() => {
                      let newConfirmationWords: string[];
                      if (confirmationWords.includes(word)) {
                        newConfirmationWords = confirmationWords.filter(
                          (w) => w !== word
                        );
                      } else {
                        newConfirmationWords = [...confirmationWords, word];
                      }
                      setConfirmationWords(newConfirmationWords);
                    }}
                  >
                    {word}
                  </button>
                ))}
            </div>
            <div className="flex w-full gap-x-4">
              <button
                className={classNames(
                  'flex-1 py-4 text-white font-bold',
                  // TODO: change color for Back button
                  'bg-[#00000022] hover:bg-gray-700 active:bg-gray-600 border border-white outline-none focus:ring-2'
                )}
                onClick={() => setCurrentStep(Step.CREATE_WALLET)}
              >
                Back
              </button>
              <button
                className={classNames(
                  'flex-1 py-4 text-white font-bold',
                  'bg-[#00000022] hover:bg-gray-700 active:bg-gray-600 border border-white outline-none focus:ring-2'
                )}
                onClick={() => {
                  if (confirmationWords.join(' ') !== mnemonic) {
                    toast.error('The secret backup phrase does not match.', {
                      position: 'top-center',
                      autoClose: 3000,
                    });
                  } else if (confirmationPassphrase !== passphrase) {
                    toast.error('The passphrase does not match.', {
                      position: 'top-center',
                      autoClose: 3000,
                    });
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
                  'w-full border border-gray-400 p-4 text-white placeholder:text-gray-300 focus:outline-none focus:ring-1 bg-transparent'
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
                  'w-full border border-gray-400 p-4 text-white placeholder:text-gray-300 focus:outline-none focus:ring-1 bg-transparent'
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
                  'w-full border border-gray-400 p-4 text-white placeholder:text-gray-300 focus:outline-none focus:ring-1 bg-transparent'
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
                  'bg-[#00000022] hover:bg-gray-700 active:bg-gray-600 border border-white outline-none focus:ring-2'
                )}
                onClick={() => setCurrentStep(Step.CONFIRM_WALLET)}
              >
                Back
              </button>
              <button
                className={classNames(
                  'flex-1 py-4 text-white font-bold',
                  'bg-[#00000022] hover:bg-gray-700 active:bg-gray-600 border border-white outline-none focus:ring-2'
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
            <Link href="/jobs">
              <a>
                <button
                  className={classNames(
                    'px-16 py-4 text-white font-bold',
                    'bg-[#00000022] hover:bg-gray-700 active:bg-gray-600 border border-white outline-none focus:ring-2'
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
