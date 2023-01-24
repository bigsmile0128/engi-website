import classNames from 'classnames';
import { useRouter } from 'next/router';
import EngiText from '~/components/global/icons/EngiText';
import SignInWithLocalWallets from '~/components/pages/signup/SignInWithLocalWallets';

type LoginProps = {
  className?: string;
};

export default function Login({ className }: LoginProps) {
  const router = useRouter();
  return (
    <div
      className={classNames(
        'max-w-page mt-16 mb-24 flex flex-col items-center max-w-[470px]',
        className
      )}
    >
      <EngiText />
      <p className="font-bold text-4xl mt-4">Welcome back!</p>
      <p className="text-xl text-secondary w-full text-center mt-8 mb-8 sm:mb-12">
        {
          "Don't miss your next bit. Sign in to stay updated in your professional world."
        }
      </p>
      <SignInWithLocalWallets
        className="w-full"
        onSuccess={() => router.push('/login/success')}
      />
    </div>
  );
}
