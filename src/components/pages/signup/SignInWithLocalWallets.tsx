import classNames from 'classnames';
import { useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import Button from '~/components/global/Button/Button';
import { useLoginUser } from '~/utils/auth/api';
import { useUser } from '~/utils/contexts/userContext';
import useSubstrateAccounts from '~/utils/hooks/useSubstrateAccounts';
import SubstrateAccountButton from './SubstrateAccountButton';

type SignInWithLocalWalletsProps = {
  className?: string;
  onSuccess?: () => void;
};

export default function SignInWithLocalWallets({
  className,
  onSuccess,
}: SignInWithLocalWalletsProps) {
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
        Array.from({ length: 1 }).map((_, i) => (
          <SubstrateAccountButton key={i} isLoading />
        ))
      ) : substrateAccounts?.length > 0 ? (
        substrateAccounts?.map((account) => (
          <SubstrateAccountButton
            key={account.address}
            account={account}
            onClick={() =>
              login({
                address: account.address,
                source: account.meta.source,
                display: account.meta.name,
              })
            }
          />
        ))
      ) : (
        <>
          <span className="text-xl text-red-400">No connected accounts.</span>
          <Button className="mt-8" onClick={() => refetchAccounts()}>
            Refresh
          </Button>
        </>
      )}
    </div>
  );
}
