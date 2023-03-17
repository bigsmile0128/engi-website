import classNames from 'classnames';
import { useRouter } from 'next/router';
import EngiText from '~/components/global/icons/EngiText';
import SignInWithLocalWallets from '~/components/pages/signup/SignInWithLocalWallets';
import useSubstrateAccounts from '~/utils/hooks/useSubstrateAccounts';
import PropagateLoader from 'react-spinners/PropagateLoader';
import { RiAlarmWarningLine } from 'react-icons/ri';
import Link from 'next/link';
import Button from '~/components/global/Button/Button';

type LoginProps = {
  className?: string;
};

export default function Login({ className }: LoginProps) {
  const router = useRouter();
  // load all accounts from all extensions the user wishes to connect
  const {
    isLoading,
    isError,
    data: substrateAccounts,
  } = useSubstrateAccounts();

  return (
    <div
      className={classNames(
        'max-w-page mt-16 mb-24 flex flex-col items-center max-w-[640px]',
        className
      )}
    >
      <EngiText className="h-auto w-36 mb-12" />
      {isLoading ? (
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
            {isError || substrateAccounts?.length === 0
              ? 'Welcome to Engi!'
              : 'Welcome back!'}
          </p>
          <p className="text-xl text-secondary w-full text-center mt-8 mb-12 max-w-[470px]">
            {isError || substrateAccounts?.length === 0
              ? "Don't miss your next bit. Sign up to stay updated in your professional world."
              : "Don't miss your next bit. Sign in to stay updated in your professional world."}
          </p>
          {isError ? (
            <div className="flex flex-col items-center bg-black/20 w-full p-8">
              <RiAlarmWarningLine className="h-20 w-20" />
              <span className="text-xl text-secondary mt-4 text-center">
                No wallet extension detected.
              </span>
              <Link
                href="https://button-produce-60a.notion.site/Create-Your-Keys-34da44e16e8c4abc8f3d42b5e6f43cfbÁ"
                target="href"
                className="mt-8"
              >
                <Button>View Guide</Button>
              </Link>
            </div>
          ) : (
            <SignInWithLocalWallets
              className="w-full"
              onSuccess={() => router.push('/login/success')}
            />
          )}
        </div>
      )}
    </div>
  );
}
