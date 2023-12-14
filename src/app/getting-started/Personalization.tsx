'use client';

import classNames from 'classnames';
import { useCallback, useEffect, useState } from 'react';
import { MdLaptop } from 'react-icons/md';
import { RiGroupLine } from 'react-icons/ri';
import { toast } from 'react-toastify';
import useUpdateUser from '../(user)/engineer/[accountId]/useUpdateUser';
import { useRouter } from 'next/navigation';

type PersonalizationProps = {
  className?: string;
  currentUserType?: string;
  onSuccess?: () => void;
  refreshOnSuccess?: boolean;
};

export default function Personalization({
  className,
  currentUserType,
  onSuccess,
  refreshOnSuccess,
}: PersonalizationProps) {
  const [userType, setUserType] = useState(currentUserType);
  const mutation = useUpdateUser();
  const router = useRouter();

  const onChangeUserType = useCallback(
    (userType) => {
      setUserType(userType);
      mutation.mutate({
        userType,
      });
    },
    [mutation]
  );

  useEffect(() => {
    if (mutation.isSuccess) {
      toast.success('Successfully updated preferences.');
      if (refreshOnSuccess) {
        router.refresh();
      }
      onSuccess?.();
      mutation.reset();
    } else if (mutation.isError) {
      toast.error('Failed to update preferences.');
      mutation.reset();
    }
  }, [mutation, onSuccess, refreshOnSuccess, router]);

  return (
    <div className={classNames('flex flex-col gap-4', className)}>
      <button
        className={classNames(
          'bg-black/20 border focus-green-primary',
          'p-8 flex items-start gap-4',
          'hover:text-green-primary hover:border-green-primary',
          userType === 'BUSINESS'
            ? 'border-green-primary text-green-primary'
            : 'border-white'
        )}
        onClick={() => onChangeUserType('BUSINESS')}
      >
        <RiGroupLine className="h-8 w-auto" />
        <div className="flex flex-col items-start gap-2">
          <span className="font-bold">Business</span>
          <span className="text-sm text-secondary text-left">
            You plan to create bounties for others to solve.
          </span>
        </div>
      </button>
      <button
        className={classNames(
          'bg-black/20 border focus-green-primary',
          'p-8 flex items-start gap-4',
          'hover:text-green-primary hover:border-green-primary',
          userType === 'FREELANCER'
            ? 'border-green-primary text-green-primary'
            : 'border-white'
        )}
        onClick={() => onChangeUserType('FREELANCER')}
      >
        <MdLaptop className="h-8 w-auto" />
        <div className="flex flex-col items-start gap-2">
          <span className="font-bold">Freelancer</span>
          <span className="text-sm text-secondary text-left">
            You plan to solve bounties.
          </span>
        </div>
      </button>
    </div>
  );
}
