'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { Id as ToastId, toast } from 'react-toastify';
import { useConfirmEmail } from '~/utils/auth/api';

// The confirm email URL sent to users when registering their wallets
// with engi
export default function ConfirmPage({
  params,
}: {
  params: { address: string };
}) {
  const { push: pushRoute } = useRouter();
  const { address } = params;
  const searchParams = useSearchParams();
  const token = searchParams?.get('token');
  const {
    mutate: confirmEmail,
    isLoading: confirmingEmail,
    isSuccess: emailConfirmed,
    isError: failedToConfirmEmail,
    error: confirmEmailError,
  } = useConfirmEmail();

  // display confirmation states
  const confirmEmailStatesDisplay = useRef<ToastId | null>(null);

  useEffect(() => {
    if (confirmingEmail) {
      confirmEmailStatesDisplay.current = toast('Confirming email...', {
        position: 'top-center',
        isLoading: true,
      });
    } else if (emailConfirmed) {
      if (!confirmEmailStatesDisplay.current) {
        return;
      }

      toast.update(confirmEmailStatesDisplay.current, {
        render: 'Email confirmed! Please sign in.',
        isLoading: false,
        autoClose: 3000,
        type: toast.TYPE.SUCCESS,
      });
    } else if (failedToConfirmEmail) {
      if (!confirmEmailStatesDisplay.current) {
        return;
      }

      toast.update(confirmEmailStatesDisplay.current, {
        render: `${confirmEmailError.message} Please try again.`,
        isLoading: false,
        autoClose: 5000,
        type: toast.TYPE.ERROR,
      });
    }
  }, [
    confirmingEmail,
    emailConfirmed,
    failedToConfirmEmail,
    confirmEmailError,
    confirmEmailStatesDisplay,
  ]);

  useEffect(() => {
    if (emailConfirmed) {
      pushRoute('/login');
    }
  }, [emailConfirmed, pushRoute]);

  useEffect(() => {
    if (address && token) {
      confirmEmail({ address, token });
    }
  }, [address, confirmEmail, token]);

  return (
    <div className="p-20 text-center font-bold text-xl">
      Confirming Email Address...
    </div>
  );
}
