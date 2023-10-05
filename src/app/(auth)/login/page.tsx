'use client';

import classNames from 'classnames';
import { useRouter } from 'next/navigation';
import EngiText from '~/components/global/icons/EngiText';
import SignInWithLocalWallets from '~/components/pages/signup/SignInWithLocalWallets';
import useSubstrateAccounts from '~/utils/hooks/useSubstrateAccounts';
import PropagateLoader from 'react-spinners/PropagateLoader';
import { RiAlarmWarningLine } from 'react-icons/ri';
import Link from 'next/link';
import Button from '~/components/global/Button/Button';
import { AccountExistenceResult } from '~/types';
import { COOKBOOK_LINK } from '~/utils/links';
import { useState } from 'react';
import connectedImg from 'public/img/signup/connected.png';
import Image from 'next/image';

export default function Login() {
  const router = useRouter();
  // load all accounts from all extensions the user wishes to connect
  const {
    isLoading,
    isError,
    data: substrateAccounts,
  } = useSubstrateAccounts();

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const registeredAccounts = (substrateAccounts ?? []).filter(
    (account) => account.exists === AccountExistenceResult.YES
  );

  return (
    <div
      className={classNames(
        'max-w-page mt-16 mb-24 flex flex-col items-center max-w-[640px]'
      )}
    >
      <EngiText className="h-auto w-36 mb-12" />
      {isLoggedIn ? (
        <div
          className={classNames(
            'max-w-page mb-24 flex flex-col items-center text-center'
          )}
        >
          <p className="font-grifter text-3xl mt-8">Sucessfully logged in!</p>
          <Image
            className="mt-8 h-56 w-auto"
            src={connectedImg}
            alt="success"
          />

          <div className="mt-12 flex items-center justify-center gap-8">
            <Link href="/engineer/me" className="flex-1">
              <Button className="w-[240px]">Go to my account</Button>
            </Link>
            <Link href="/bounty" className="flex-1">
              <Button className="w-[240px]" variant="primary">
                Browse Bounties
              </Button>
            </Link>
          </div>
        </div>
      ) : isLoading ? (
        <div className="relative flex flex-col items-center gap-8">
          <PropagateLoader
            color="#ffffff"
            size={34}
            cssOverride={{ transform: 'translateX(-17px)' }}
          />
          <span className="text-sm text-tertiary mt-4">
            Connecting to extension...
          </span>
        </div>
      ) : (
        <div className="flex flex-col items-center w-full overflow-hidden">
          <p className="font-bold text-4xl">
            {isError || registeredAccounts.length === 0
              ? 'Connect your wallet'
              : 'Welcome back!'}
          </p>
          <p className="text-xl text-secondary w-full text-center mt-8 mb-12 max-w-[470px]">
            {isError || substrateAccounts?.length === 0
              ? 'Select the wallet that you would like to connect to get started on Engi!'
              : 'Select an account that you would like to log in with and start working on Bounties!'}
          </p>
          {isError ? (
            <div className="flex flex-col items-center bg-black/20 w-full p-8">
              <RiAlarmWarningLine className="h-20 w-20" />
              <span className="text-xl text-secondary mt-4 text-center">
                No wallet extension detected.
              </span>
              <Link href={COOKBOOK_LINK} target="href" className="mt-8">
                <Button>View Guide</Button>
              </Link>
            </div>
          ) : (
            <SignInWithLocalWallets
              className="w-full"
              onSuccess={() => {
                setIsLoggedIn(true);
                router.refresh();
              }}
            />
          )}
        </div>
      )}
    </div>
  );
}
