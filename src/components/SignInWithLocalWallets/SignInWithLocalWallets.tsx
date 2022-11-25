import { useRouter } from 'next/router';
import { useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import ReactTooltip from 'react-tooltip';
import { useLoginUser } from '~/utils/auth/api';
import { useUser } from '~/utils/contexts/userContext';
import { useConnectPolkadotExtension } from '~/utils/polkadot/extension';
import { RefreshIcon } from '@heroicons/react/outline';
import Avvvatars from 'avvvatars-react';
import classNames from 'classnames';

const Dots = (props) => (
  <svg
    width="4"
    height="20"
    viewBox="0 0 4 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M2 0.25C1.10625 0.25 0.375 0.98125 0.375 1.875C0.375 2.76875 1.10625 3.5 2 3.5C2.89375 3.5 3.625 2.76875 3.625 1.875C3.625 0.98125 2.89375 0.25 2 0.25ZM2 16.5C1.10625 16.5 0.375 17.2313 0.375 18.125C0.375 19.0188 1.10625 19.75 2 19.75C2.89375 19.75 3.625 19.0188 3.625 18.125C3.625 17.2313 2.89375 16.5 2 16.5ZM2 8.375C1.10625 8.375 0.375 9.10625 0.375 10C0.375 10.8938 1.10625 11.625 2 11.625C2.89375 11.625 3.625 10.8938 3.625 10C3.625 9.10625 2.89375 8.375 2 8.375Z"
      fill="white"
    />
  </svg>
);

const Connecting = () => <span className="h-2 skeleton" />;

const CouldNotConnectToExtension = ({ error, retry }) => (
  <>
    <div
      className="bg-[#07070690] hover:bg-[#ffffff10] cursor-pointer"
      onClick={retry}
      data-tip="Retry After Installing Browser Wallet Extension"
      data-for="retryconnecting"
      data-class="bg-black bg-opacity-50 font-medium"
      data-place="bottom"
      data-effect="solid"
    >
      <div className="py-4 px-8 flex items-center">
        <div className="flex flex-col">
          {error?.message}
          <span className="font-light">Click to Retry Connecting</span>
        </div>
      </div>
    </div>

    <ReactTooltip id="retryconnecting" />
  </>
);

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
    isLoading: connectingToExtensions,
    isError: failedToConnectForAccounts,
    error: connectExtensionError,
    data: substrateAccounts,
    // TODO: retrying, need to invalidate cache before
    refetch: retryConnecting,
    isRefetchError: failedRetryingConnection,
    isRefetching: retryingConnection,
  } = useConnectPolkadotExtension();

  const { push: pushRoute } = useRouter();

  // display connection states
  const connectionStatesDisplay = useRef(null);
  useEffect(() => {
    if (connectingToExtensions || retryingConnection) {
      connectionStatesDisplay.current = toast('Connecting extensions...', {
        position: 'top-center',
        isLoading: true,
      });
    } else if (substrateAccounts) {
      // update loading or error toasts
      toast.update(connectionStatesDisplay.current, {
        render: 'Connected!',
        type: toast.TYPE.SUCCESS,
        autoClose: 3000,
        isLoading: false,
      });
      onSuccess?.();
    } else if (failedToConnectForAccounts || failedRetryingConnection) {
      toast.update(connectionStatesDisplay.current, {
        render: 'Please retry connecting a Substrate compatible extension.',
        type: toast.TYPE.ERROR,
        autoClose: 5000,
        isLoading: false,
      });
    }
  }, [
    connectingToExtensions,
    substrateAccounts,
    failedToConnectForAccounts,
    connectionStatesDisplay,
    retryingConnection,
    failedRetryingConnection,
    onSuccess,
  ]);

  const {
    mutate: login,
    isLoading: loggingUserIn,
    isError: failedToLogin,
    error: loginError,
    data: loggedIn,
  } = useLoginUser();

  const { setUser } = useUser();
  useEffect(() => {
    if (loggedIn) {
      const { address: walletId, accessToken, display } = loggedIn;

      setUser({ walletId, accessToken, display });
    }
  }, [loggedIn, setUser]);

  // display login states
  const loginStatesDisplay = useRef(null);
  useEffect(() => {
    if (loggingUserIn) {
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

      // pushRoute('/jobs');
    } else if (failedToLogin) {
      toast.update(loginStatesDisplay.current, {
        render: "Make sure you've registered and confirmed your email address",
        isLoading: false,
        autoClose: 5000,
        type: toast.TYPE.ERROR,
      });
    }
  }, [
    loggingUserIn,
    loggedIn,
    failedToLogin,
    loginStatesDisplay,
    pushRoute,
    loginError?.message,
  ]);

  return (
    <div className={classNames('bg-[#07070690]', className)}>
      {failedToConnectForAccounts ? (
        <CouldNotConnectToExtension
          error={connectExtensionError}
          retry={retryConnecting}
        />
      ) : connectingToExtensions ? (
        <Connecting />
      ) : !substrateAccounts?.length ? (
        <div className="py-4 px-8 flex items-center">
          <span className="mx-4 font-light">No Connected Accounts</span>
          <RefreshIcon
            onClick={() => retryConnecting()}
            className={`text-gray-50 text-opacity-70 h-5 w-5 ml-1 cursor-pointer ${
              retryingConnection && 'animate-spin'
            }`}
            data-tip="Retry Connecting to Accounts"
            data-class="bg-black bg-opacity-50 font-medium"
            data-place="right"
            data-effect="solid"
          />
          <ReactTooltip />
        </div>
      ) : (
        substrateAccounts && (
          <>
            {substrateAccounts?.map(
              ({ address, meta: { name: display, source } }) => (
                <div
                  key={`${source}|${name}|${address}`}
                  className="py-4 px-8 flex items-center hover:bg-[#ffffff10] cursor-pointer"
                  onClick={() => {
                    login({ address, source, display });
                  }}
                >
                  <Avvvatars value={address} style="shape" size={45} />
                  <div className="flex flex-col flex-1 mx-4 truncate">
                    <span className="text-lg font-bold">{display}</span>
                    <span className="text-sm font-light truncate text-ellipsis block">
                      {address}
                    </span>
                  </div>

                  <Dots className="flex-shrink-0" />
                </div>
              )
            )}
          </>
        )
      )}
    </div>
  );
}
