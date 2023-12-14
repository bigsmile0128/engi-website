'use client';

import classNames from 'classnames';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { AiOutlineLoading } from 'react-icons/ai';
import { RiAlarmWarningLine } from 'react-icons/ri';
import PropagateLoader from 'react-spinners/PropagateLoader';
import { toast } from 'react-toastify';
import Button from '~/components/global/Button/Button';
import Input from '~/components/global/Input/Input';
import EngiText from '~/components/global/icons/EngiText';
import { SubstrateAccount } from '~/types';
import { useRegisterUser } from '~/utils/auth/api';
import useSubstrateAccounts from '~/utils/hooks/useSubstrateAccounts';
import { COOKBOOK_LINK } from '~/utils/links';

export default function Signup() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const address = searchParams?.get('address') ?? '';
  const [account, setAccount] = useState<SubstrateAccount | null>(null);
  const [email, setEmail] = useState('');
  const {
    isLoading,
    isError,
    data: substrateAccounts,
  } = useSubstrateAccounts();

  const registerMutation = useRegisterUser();

  // auto-select address if coming from login page
  useEffect(() => {
    if (
      substrateAccounts &&
      address &&
      substrateAccounts.find((account) => account.address === address)
    ) {
      setAccount(
        substrateAccounts.find((account) => account.address === address) ?? null
      );
    }
  }, [substrateAccounts, address]);

  // handle register flow
  useEffect(() => {
    if (registerMutation.error?.message) {
      toast.error(registerMutation.error.message);
    } else if (registerMutation.isSuccess) {
      router.push(`/signup/email?address=${address}`);
    }
  }, [registerMutation.error, registerMutation.isSuccess, router, address]);

  return (
    <div
      className={classNames(
        'max-w-page mt-16 mb-24 flex flex-col items-center max-w-[470px] tablet:py-24'
      )}
    >
      {isLoading ? (
        <div className="relative flex flex-col items-center gap-8">
          {/* TODO: update loader */}
          <PropagateLoader
            color="#ffffff"
            size={34}
            cssOverride={{ transform: 'translateX(-17px)' }}
          />
          <span className="text-sm text-tertiary mt-4">
            Connecting to extension...
          </span>
        </div>
      ) : isError ? (
        <div className="flex flex-col items-center bg-black/20 w-full p-8">
          <RiAlarmWarningLine className="h-20 w-20" />
          <span className="text-xl text-secondary mt-4 text-center">
            No wallet extension detected.
          </span>
          <Link href={COOKBOOK_LINK} target="href" className="mt-8">
            <Button>View Guide</Button>
          </Link>
        </div>
      ) : account ? (
        <>
          <EngiText className="h-auto w-36 mb-12" />
          <p className="font-bold text-3xl">Enter your email</p>
          <p className="mt-8 text-xl text-secondary w-full text-center">
            Enter the email you would like to use on Engi. You can always update
            this later.
          </p>
          <form
            className="w-full mt-12 flex flex-col"
            onSubmit={(e) => {
              e.preventDefault();
              registerMutation.mutate({
                address: account.address,
                display: account.meta.name,
                source: account.meta.source,
                email,
              });
            }}
          >
            <label
              htmlFor="email"
              className="font-bold text-xl text-left w-full"
            >
              Email address
            </label>
            <Input
              name="email"
              className="mt-4 w-full"
              value={email}
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter an email address..."
            />
            <Button
              className={classNames(
                'mt-12 flex items-center justify-center w-full'
              )}
              variant="primary"
              disabled={
                !account || !email || isLoading || registerMutation.isLoading
              }
            >
              {registerMutation.isLoading ? (
                <AiOutlineLoading className="animate-spin text-lg text-green-primary" />
              ) : (
                <span>Continue</span>
              )}
            </Button>
          </form>
        </>
      ) : (
        <div className="flex flex-col items-center bg-black/20 w-full p-8">
          <RiAlarmWarningLine className="h-20 w-20" />
          <span className="text-xl text-secondary mt-4 text-center">
            Address not found.
          </span>
          <Button
            variant="primary"
            className="mt-8"
            onClick={() => router.back()}
          >
            Back
          </Button>
        </div>
      )}
    </div>
  );
}
