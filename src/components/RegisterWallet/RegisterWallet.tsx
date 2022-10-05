import { useConnectPolkadotExtension } from '~/utils/polkadot/extension';
import { toast } from 'react-toastify';
import classNames from 'classnames';
import { useEffect, useMemo, useRef, useState } from 'react';
import SelectMenu from '../SelectMenu';
import { useRegisterUser } from '~/utils/auth/api';
import { useRouter } from 'next/router';
import { RefreshIcon } from '@heroicons/react/outline';
import ReactTooltip from 'react-tooltip';

export default function RegisterWallet() {
  const {
    isLoading: connectingToExtensions,
    isError: failedToConnectForAccounts,
    error: connectExtensionError,
    data: substrateAccounts,
    refetch: retryConnecting,
    isRefetching: retryingConnection,
  } = useConnectPolkadotExtension();

  const {
    mutate: register,
    isLoading: registeringUser,
    isSuccess: registered,
    isError: failedToRegister,
    error: registerError,
    data: registeredWallet,
  } = useRegisterUser();

  // the wallet selected by the user from the connected accounts
  const [walletToImport, setWalletToImport] = useState<{
    address: string;
    display: string;
  }>(null);
  const display = useMemo(() => walletToImport?.display, [walletToImport]);

  const [email, setEmail] = useState<string>(null);

  const { back: goBackToSignUp } = useRouter();

  // display registration states
  const registerStatesDisplay = useRef(null);
  useEffect(() => {
    if (registeringUser) {
      registerStatesDisplay.current = toast('Registering user...', {
        position: 'top-center',
        isLoading: true,
      });
    } else if (registeredWallet) {
      // update loading or error toasts
      toast.update(registerStatesDisplay.current, {
        render: 'Registered! Please confirm your email then sign in.',
        type: toast.TYPE.SUCCESS,
        autoClose: 3000,
        isLoading: false,
      });

      goBackToSignUp();
    } else if (failedToRegister) {
      toast.update(registerStatesDisplay.current, {
        render: `${registerError.message} Please retry.`,
        type: toast.TYPE.ERROR,
        autoClose: 5000,
        isLoading: false,
      });
    }
  }, [
    registeringUser,
    registeredWallet,
    failedToRegister,
    registerStatesDisplay,
    registerError,
    goBackToSignUp,
  ]);

  return (
    <div className={'max-w-page lg:py-20'}>
      <h1 className="font-bold text-5xl mb-12">Register Account</h1>

      <p className="my-2 text-lg max-w-xl text-white text-opacity-70">
        Join with an email to receive job notifications, payment receipts, and
        network updates
      </p>

      <div className="flex items-center justify-between">
        <div className="flex items-center">
          {substrateAccounts || connectingToExtensions ? (
            <SelectMenu
              isLoading={connectingToExtensions}
              className="my-4 text-xl w-full"
              labelClassName="ml-0"
              buttonLabel={
                walletToImport ? walletToImport.display : 'Select Account'
              }
              options={
                substrateAccounts?.map?.(
                  ({ address: value, meta: { name: label } }) => ({
                    label,
                    value,
                  })
                ) ?? []
              }
              onChange={({ label, value }) =>
                setWalletToImport({ address: value, display: label })
              }
            />
          ) : (
            <span className="font-bold text-lg text-red-500 py-4">
              No Accounts Detected
            </span>
          )}

          <RefreshIcon
            onClick={() => retryConnecting()}
            className={`text-gray-50 text-opacity-70 h-5 w-5 ml-1 cursor-pointer ${
              retryingConnection && 'animate-spin'
            }`}
            data-tip="Refetch Connected Accounts"
            data-class="bg-black bg-opacity-50 font-medium"
            data-place="top"
            data-effect="solid"
          />
          <ReactTooltip />
        </div>

        {walletToImport && (
          <span className="font-medium text-xl truncate">
            {walletToImport.address}
          </span>
        )}
      </div>

      <div className="flex gap-x-4 mb-12">
        <input
          className={classNames(
            'w-full border border-gray-400 p-4 text-white placeholder:text-gray-300 outline-none focus-visible:ring-1 bg-transparent'
          )}
          type="email"
          name="email"
          id="email"
          placeholder="Email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="flex w-full gap-x-4">
        <button
          className={classNames(
            'flex-1 py-4 text-white font-bold',
            // TODO: change color for Back button
            'bg-[#00000022] hover:bg-gray-700 active:bg-gray-600 border border-white outline-none focus-visible:ring-2'
          )}
          onClick={goBackToSignUp}
          data-tip="Cancel Registration"
          data-place="top"
          data-class="bg-black bg-opacity-50 font-medium"
          data-effect="solid"
        >
          Back
        </button>
        <button
          className={classNames({
            'flex-1 py-4 text-white font-bold': true,
            'bg-[#00000022] border border-white outline-none focus-visible:ring-2':
              true,
            'disabled cursor-not-allowed text-opacity-50 border-opacity-50':
              !display || !email,
            'hover:bg-gray-700 cursor-pointer active:bg-gray-600':
              display && email,
          })}
          {...(!display || !email
            ? {
                ['data-tip']: 'Wallet Selection & Email Required',
                ['data-place']: 'top',
                ['data-class']:
                  'bg-black bg-opacity-50 font-medium text-red-300',
                ['data-effect']: 'solid',
              }
            : {
                onClick: () => {
                  register({
                    display,
                    email,
                  });
                },
              })}
        >
          Create
        </button>
      </div>
      <ReactTooltip />
    </div>
  );
}
