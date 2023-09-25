'use client';

import { useCallback } from 'react';
import SignInWithLocalWallets from '~/components/pages/signup/SignInWithLocalWallets';

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  const onLogin = useCallback(() => {
    // after successfully logging in, reload page
    window.location.reload();
  }, []);

  return (
    <div>
      <h2 className="font-medium text-xl">
        Your login expired. Please log in again.
      </h2>
      <SignInWithLocalWallets className="w-full" onSuccess={onLogin} />
    </div>
  );
}
