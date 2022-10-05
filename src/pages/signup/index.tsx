import classNames from 'classnames';
import axios from 'axios';
import { gql } from 'graphql-request';
import Button from '~/components/global/Button/Button';
import SignInWithLocalWallets from '~/components/SignInWithLocalWallets/SignInWithLocalWallets';
import { useRouter } from 'next/router';

type SignupProps = {
  className?: string;
};

export default function Signup({ className }: SignupProps) {
  const { push: pushRoute } = useRouter();

  // TODO: adjust padding and margin on mobile
  return (
    <div className={classNames('max-w-page lg:py-20', className)}>
      <div className="flex">
        <div
          style={{ flexBasis: '60%' }}
          className="flex flex-col items-center lg:p-20"
        >
          <h1 className="font-bold text-4xl mb-4">Welcome back</h1>
          <p className="mb-8 max-w-sm text-center text-lg">
            {`Don't miss your next job. Sign in to stay updated on your
                professional world`}
          </p>
          <SignInWithLocalWallets />
        </div>

        <div
          style={{ flexBasis: '40%' }}
          className="flex flex-col items-center lg:p-20 overflow-visible relative"
        >
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
            Import a Substrate compatible wallet to get started
          </p>
          <Button
            variant="primary"
            className="w-full"
            onClick={() => pushRoute('signup/register')}
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
