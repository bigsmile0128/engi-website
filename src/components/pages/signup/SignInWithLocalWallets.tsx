import classNames from 'classnames';
import { useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { RiAlarmWarningLine, RiRefreshLine } from 'react-icons/ri';
import { toast } from 'react-toastify';
import Button from '~/components/global/Button/Button';
import { AccountExistenceResult } from '~/types';
import { useLoginUser } from '~/utils/auth/api';
import { useUser } from '~/utils/contexts/userContext';
import useSubstrateAccounts from '~/utils/hooks/useSubstrateAccounts';
import SubstrateAccountItem from './SubstrateAccountItem';

type SignInWithLocalWalletsProps = {
  className?: string;
  onSuccess?: () => void;
};

export default function SignInWithLocalWallets({
  className,
  onSuccess,
}: SignInWithLocalWalletsProps) {
  const router = useRouter();
  // load all accounts from all extensions the user wishes to connect
  const {
    isLoading: isLoadingAccounts,
    isError: failedToConnectForAccounts,
    error: connectExtensionError,
    data: substrateAccounts,
    // TODO: retrying, need to invalidate cache before
    refetch: refetchAccounts,
    isRefetching: isRefetchingAccounts,
  } = useSubstrateAccounts();

  const {
    mutate: login,
    isLoading: isLoggingIn,
    isError: failedToLogin,
    error: loginError,
    data: loggedIn,
  } = useLoginUser();

  const { setUser } = useUser();
  useEffect(() => {
    if (loggedIn) {
      setUser(loggedIn);
      onSuccess?.();
    }
  }, [loggedIn, setUser, onSuccess]);

  // display login states
  const loginStatesDisplay = useRef(null);
  useEffect(() => {
    if (isLoggingIn) {
      loginStatesDisplay.current = toast('Logging in...', {
        position: 'top-center',
        isLoading: true,
      });
    } else if (loggedIn) {
      toast.update(loginStatesDisplay.current, {
        render: 'Successfully logged in!',
        isLoading: false,
        autoClose: 3000,
        type: toast.TYPE.SUCCESS,
      });
    } else if (failedToLogin) {
      toast.update(loginStatesDisplay.current, {
        render: "Make sure you've registered and confirmed your email address",
        isLoading: false,
        autoClose: 5000,
        type: toast.TYPE.ERROR,
      });
    }
  }, [
    isLoggingIn,
    loggedIn,
    failedToLogin,
    loginStatesDisplay,
    loginError?.message,
  ]);

  return (
    <div className={classNames('flex flex-col overflow-hidden', className)}>
      {failedToConnectForAccounts ? (
        <>
          <span className="text-xl text-red-400">
            {connectExtensionError?.message ||
              'Failed to connect to extension.'}
          </span>
          <Button className="mt-8" onClick={() => refetchAccounts()}>
            Retry
          </Button>
        </>
      ) : isLoadingAccounts || isRefetchingAccounts ? (
        <>
          <Button
            className="flex items-center gap-1 self-end mb-1"
            variant="link"
            disabled
          >
            <span>Refresh</span>
            <RiRefreshLine className="animate-spin" />
          </Button>
          {Array.from({ length: 1 }).map((_, i) => (
            <SubstrateAccountItem key={i} isLoading />
          ))}
        </>
      ) : substrateAccounts?.length > 0 ? (
        <>
          <Button
            className="flex items-center gap-1 self-end mb-1"
            variant="link"
            onClick={() => refetchAccounts()}
          >
            <span>Refresh</span>
            <RiRefreshLine />
          </Button>
          <div className="flex flex-col divide-y divide-[#AEB5C7]/30 max-h-[266px] overflow-y-auto scrollbar">
            {substrateAccounts
              ?.sort((a, b) => {
                // sort by registered, unconfirmed, not registered
                if (
                  a?.exists === AccountExistenceResult.YES &&
                  b?.exists !== AccountExistenceResult.YES
                ) {
                  return -1;
                } else if (
                  a?.exists !== AccountExistenceResult.YES &&
                  b?.exists === AccountExistenceResult.YES
                ) {
                  return 1;
                } else if (
                  a?.exists === AccountExistenceResult.UNCONFIRMED &&
                  b?.exists !== AccountExistenceResult.UNCONFIRMED
                ) {
                  return -1;
                } else if (
                  a?.exists !== AccountExistenceResult.UNCONFIRMED &&
                  b?.exists === AccountExistenceResult.UNCONFIRMED
                ) {
                  return 1;
                } else {
                  return 0;
                }
              })
              ?.map((account) => (
                <SubstrateAccountItem
                  className="shrink-0"
                  key={account.address}
                  account={account}
                  onClick={() => {
                    if (account?.exists === AccountExistenceResult.YES) {
                      login({
                        address: account.address,
                        source: account.meta.source,
                        display: account.meta.name,
                      });
                    } else if (
                      account?.exists === AccountExistenceResult.UNCONFIRMED
                    ) {
                      router.push(
                        `/signup/email?address=${account?.address}&initial-send=true`
                      );
                    } else {
                      router.push(`/signup?address=${account?.address}`);
                    }
                  }}
                />
              ))}
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center bg-black/20 w-full p-8">
          <RiAlarmWarningLine className="h-20 w-20" />
          <span className="text-xl text-secondary mt-4 text-center">
            No connected accounts.
          </span>
          <Button className="mt-8" onClick={() => refetchAccounts()}>
            Refresh
          </Button>
        </div>
      )}
    </div>
  );
}
