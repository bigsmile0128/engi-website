import classNames from 'classnames';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { AiOutlineLoading } from 'react-icons/ai';
import { RiRefreshLine } from 'react-icons/ri';
import { components, OptionProps } from 'react-select';
import { toast } from 'react-toastify';
import Button from '~/components/global/Button/Button';
import EngiText from '~/components/global/icons/EngiText';
import Input from '~/components/global/Input/Input';
import Select from '~/components/global/Select';
import TextLink from '~/components/TextLink';
import { SubstrateAccount } from '~/types';
import { useRegisterUser } from '~/utils/auth/api';
import useSubstrateAccounts from '~/utils/hooks/useSubstrateAccounts';

const Option = (props: OptionProps<SubstrateAccount>) => {
  const account = props.data;
  return (
    <components.Option {...props}>
      <div className="flex flex-col items-start">
        <span className="font-medium">{account.meta.name}</span>
        <span
          className={classNames(
            'w-full truncate text-sm',
            props.isSelected ? 'text-gray-600' : 'text-secondary'
          )}
        >
          {account.address}
        </span>
      </div>
    </components.Option>
  );
};

type SignupProps = {
  className?: string;
};

export default function Signup({ className }: SignupProps) {
  const router = useRouter();
  const address = (router.query.address ?? '').toString();
  const [account, setAccount] = useState<SubstrateAccount | null>(null);
  const [email, setEmail] = useState('');
  const {
    isLoading,
    isError,
    data: substrateAccounts,
    refetch,
    isRefetching,
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
        substrateAccounts.find((account) => account.address === address)
      );
    }
  }, [substrateAccounts, address]);

  // handle register flow
  useEffect(() => {
    if (registerMutation.error?.message) {
      toast.error(registerMutation.error.message);
    } else if (registerMutation.isSuccess) {
      router.push('/signup/success');
    }
  }, [registerMutation.error, registerMutation.isSuccess, router]);

  return (
    <div
      className={classNames(
        'max-w-page mt-16 mb-24 flex flex-col items-center max-w-[470px]',
        className
      )}
    >
      <EngiText />
      <p className="text-xl text-secondary w-full text-center mb-8 sm:mb-12 lg:mb-16">
        {
          "Don't miss your next bit. Sign up to stay updated in your professional world."
        }
      </p>

      <div className="flex flex-col w-full">
        <div className="flex items-center gap-2 mt-6">
          <label htmlFor="account" className="font-bold text-xl">
            Account
          </label>
          <button
            className="text-xl text-green-primary hover:text-green-primary/80 disabled:text-gray-400"
            disabled={isLoading || isRefetching}
            onClick={() => refetch()}
          >
            <RiRefreshLine className={isRefetching ? 'animate-spin' : ''} />
          </button>
        </div>
        <Select
          name="account"
          className="mt-4 w-full"
          options={substrateAccounts ?? []}
          value={account}
          onChange={(account: SubstrateAccount) => setAccount(account)}
          getOptionLabel={(account: SubstrateAccount) => account.meta?.name}
          getOptionValue={(account: SubstrateAccount) => account.address}
          placeholder="Select an account..."
          components={{
            Option,
          }}
          isLoading={isLoading || isRefetching}
        />
        {isError && (
          <p className="font-medium text-sm mt-2 text-red-400">
            Failed to fetch accounts.
          </p>
        )}
        <label htmlFor="email" className="font-bold text-xl mt-8">
          Email
        </label>
        <Input
          name="email"
          className="mt-4"
          value={email}
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter an email address..."
        />
        <Button
          className={classNames('mt-16 flex items-center justify-center')}
          variant="primary"
          disabled={
            !account || !email || isLoading || registerMutation.isLoading
          }
          onClick={() =>
            registerMutation.mutate({
              address: account.address,
              display: account.meta.name,
              source: account.meta.source,
              email,
            })
          }
        >
          {registerMutation.isLoading ? (
            <AiOutlineLoading className="animate-spin text-lg text-green-primary" />
          ) : (
            <span>Register</span>
          )}
        </Button>
      </div>
      <p className="mt-12">
        Already have an account?{' '}
        <TextLink
          href="/login"
          className="underline hover:text-green-primary/80"
        >
          Sign in
        </TextLink>
      </p>
    </div>
  );
}
