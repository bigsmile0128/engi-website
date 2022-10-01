import { useRouter } from 'next/router';
import { useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import { useConfirmEmail } from '~/utils/auth/api';

// The confirm email URL sent to users when registering their wallets
// with engi
export default function Confirm() {
  const router = useRouter();
  const { address, token } = router.query;
  const {
    mutate: confirmEmail,
    isLoading: confirmingEmail,
    isSuccess: emailConfirmed,
    isError: failedToConfirmEmail,
    error: confirmEmailError,
  } = useConfirmEmail();

  // display confirmation states
  const confirmEmailStatesDisplay = useRef(null);
  useEffect(() => {
    if (confirmingEmail) {
      confirmEmailStatesDisplay.current = toast('Confirming email...', {
        position: 'top-center',
        isLoading: true,
      });
    } else if (emailConfirmed) {
      toast.update(confirmEmailStatesDisplay.current, {
        render: 'Email confirmed! Welcome to Engi',
        isLoading: false,
        autoClose: 3000,
        type: toast.TYPE.SUCCESS,
      });
    } else if (failedToConfirmEmail) {
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
    if (address && token) {
      confirmEmail({ address, token });
    }
  }, [address, token]);

  return (
    <div className="p-20 text-center font-bold text-xl">
      Confirming Email Address...
    </div>
  );
}
