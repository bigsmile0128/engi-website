'use client';

import classNames from 'classnames';
import SignInWithLocalWallets from './pages/signup/SignInWithLocalWallets';
import { useCallback } from 'react';

type AuthenticationFailedProps = {
  className?: string;
  text?: string;
};

export default function AuthenticationFailed({
  className,
  text = 'Please log in.',
}: AuthenticationFailedProps) {
  const onLogin = useCallback(() => {
    // after successfully logging in, reload page
    window.location.reload();
  }, []);

  return (
    <div
      className={classNames(
        'flex flex-col items-center gap-4 max-w-lg',
        className
      )}
    >
      <h2 className="font-medium text-xl">{text}</h2>
      <SignInWithLocalWallets className="w-full" onSuccess={onLogin} />
    </div>
  );
}
