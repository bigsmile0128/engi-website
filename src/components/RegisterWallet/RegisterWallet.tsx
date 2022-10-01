import { useConnectPolkadotExtension } from '~/utils/polkadot/extension';
import { toast } from 'react-toastify';
import classNames from 'classnames';
import { useEffect, useMemo, useRef, useState } from 'react';
import SelectMenu from '../SelectMenu';
import { useRegisterUser } from '~/utils/auth/api';

export default function RegisterWallet() {
  const {
    isLoading: connectingToExtensions,
    isError: failedToConnectForAccounts,
    error: connectExtensionError,
    data: substrateAccounts,
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
  const [mnemonic, setMnemonic] = useState<string>(null);

  // display registration states
  const registerStatesDisplay = useRef(null);
  useEffect(() => {
    if (registeringUser) {
      registerStatesDisplay.current = toast('Registering user...', {
        position: 'bottom-center',
        isLoading: true,
      });
    } else if (registeredWallet) {
      // update loading or error toasts
      toast.update(registerStatesDisplay.current, {
        render: 'Registered!',
        type: toast.TYPE.SUCCESS,
        autoClose: 3000,
        isLoading: false,
      });
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
  ]);

  return (
    <div>
      <h1 className="font-bold text-5xl mb-12">Register User</h1>
      <SelectMenu
        buttonLabel="Connected Accounts"
        options={substrateAccounts.map(
          ({ address: value, meta: { name: label } }) => ({ label, value })
        )}
        onChange={({ label, value }) =>
          setWalletToImport({ address: value, display: label })
        }
      />
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
          onClick={() => {
            // TODO: nav back
          }}
        >
          Back
        </button>
        <button
          className={classNames(
            'flex-1 py-4 text-white font-bold',
            'bg-[#00000022] hover:bg-gray-700 active:bg-gray-600 border border-white outline-none focus-visible:ring-2'
          )}
          disabled={!display || !email || !mnemonic}
          onClick={() => {
            register({
              display,
              email,
              mnemonic,
            });
          }}
        >
          Create
        </button>
      </div>
    </div>
  );
}
