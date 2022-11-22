import classNames from 'classnames';
import axios from 'axios';
import { gql } from 'graphql-request';
import Button from '~/components/global/Button/Button';
import SignInWithLocalWallets from '~/components/SignInWithLocalWallets/SignInWithLocalWallets';
import { useRouter } from 'next/router';
import { InformationCircleIcon } from '@heroicons/react/outline';

type SignupProps = {
  className?: string;
};

export default function Signup({ className }: SignupProps) {
  const { push: pushRoute } = useRouter();

  // TODO: adjust padding and margin on mobile
  return (
    <div className={classNames('max-w-page py-16', className)}>
      <div
        className={classNames(
          'w-full p-4 flex items-center gap-x-4 mb-8 sm:hidden',
          'rounded-xl bg-yellow-400/30',
          className
        )}
      >
        <InformationCircleIcon className="h-12 w-12" />
        <span className="font-medium text-lg">
          Please use a desktop browser to sign up with Engi.
        </span>
      </div>
      <div className="flex">
        <div className="flex flex-col items-center basis-1/2 overflow-hidden pr-12">
          <h1 className="font-bold text-5xl mb-4">Welcome back</h1>
          <p className="mb-8 max-w-sm text-center text-lg">
            {
              "Whether you're buying software or writing it yourself, use your registered wallet to get back to building"
            }
          </p>
          <SignInWithLocalWallets className="w-full" />
        </div>
        <div className="flex flex-col items-center overflow-visible relative basis-1/2 pl-12">
          <span
            style={{
              top: '-100%',
              right: '-9999px',
              height: '9999px',
              zIndex: -1,
            }}
            className="absolute bottom-0 right-0 left-0 bg-[#00000022]"
          />
          <h1 className="font-bold text-5xl mb-4">New here?</h1>
          <p className="mb-8 text-lg text-center">
            Easily register using your favorite Substrate compatible wallet such
            as{' '}
            <a
              href="https://talisman.xyz/"
              target="_blank"
              className="hover:text-blue-200 text-blue-300"
              rel="noreferrer"
            >
              Talisman
            </a>
            ,{' '}
            <a
              href="https://subwallet.app/"
              target="_blank"
              className="hover:text-blue-200 text-blue-300"
              rel="noreferrer"
            >
              SubWallet
            </a>
            , or{' '}
            <a
              href="https://polkadot.js.org/extension/"
              target="_blank"
              className="hover:text-blue-200 text-blue-300"
              rel="noreferrer"
            >
              PolkadotJS
            </a>
            &nbsp;
          </p>
          <Button
            variant="primary"
            className="w-full"
            onClick={() => pushRoute('/signup/register')}
          >
            Register Wallet
          </Button>
        </div>
      </div>
    </div>
  );
}

export async function isWalletValid(walletId): Promise<boolean> {
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
