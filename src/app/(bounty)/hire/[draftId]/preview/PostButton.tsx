'use client';

import classNames from 'classnames';
import { useEffect } from 'react';
import { AiOutlineLoading } from 'react-icons/ai';
import { toast } from 'react-toastify';
import Button from '~/components/global/Button/Button';
import { Draft } from '~/types';
import { useUser } from '~/utils/contexts/userContext';
import usePostBounty, { isValidDraft } from './usePostBounty';

type PostButtonProps = {
  className?: string;
  draft: Draft;
  walletId: string;
};

export default function PostButton({
  className,
  draft,
  walletId,
}: PostButtonProps) {
  const { user } = useUser();
  const mutation = usePostBounty();

  useEffect(() => {
    if (mutation.error?.message) {
      toast.error(mutation.error.message);
    } else if (mutation.isSuccess) {
      toast.success('Successfully posted bounty.');
    }
  }, [mutation.error, mutation.isSuccess]);

  return (
    <Button
      variant="primary"
      className={classNames(
        'relative !px-24 flex items-center justify-center',
        className
      )}
      disabled={!isValidDraft(draft)}
      onClick={() => {
        mutation.mutate({
          walletId,
          source: user?.source,
          draft: draft,
        });
      }}
    >
      <span className={mutation.isLoading ? 'text-transparent' : ''}>
        Post Bounty
      </span>
      {mutation.isLoading && (
        <div className="animate-spin absolute h-5 w-5">
          <AiOutlineLoading className="text-lg text-black absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        </div>
      )}
    </Button>
  );
}
