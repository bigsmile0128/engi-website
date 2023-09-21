'use client';

import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import Link from 'next/link';
import Button from '~/components/global/Button/Button';
import useUpdateDraft from '~/utils/hooks/useUpdateDraft';
import { AiOutlineLoading } from 'react-icons/ai';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { engiToWoz } from '~/utils/currency/conversion';

type DraftFundingContentProps = {
  className?: string;
  defaultFunding?: string;
  draftId: string;
};

export default function DraftFundingContent({
  className,
  defaultFunding,
  draftId,
}: DraftFundingContentProps) {
  const router = useRouter();
  const [funding, setFunding] = useState(defaultFunding ?? '');

  const mutation = useUpdateDraft();

  useEffect(() => {
    if (mutation.error?.message) {
      toast.error(mutation.error.message);
    } else if (mutation.isSuccess) {
      router.push(`/hire/${encodeURIComponent(draftId)}/preview`);
    }
  }, [mutation.error, mutation.isSuccess, router, draftId]);

  return (
    <div className={classNames('w-full', className)}>
      <div className={classNames('flex flex-col items-start gap-2', className)}>
        <span className="text-secondary">Enter funding amount</span>
        <div className="relative font-grifter text-3xl">
          <div className="absolute top-0 left-0">e</div>
          <input
            id="funding"
            className={classNames(
              'w-32 pl-6',
              'bg-transparent border-b border-white/30',
              'outline-none focus-visible:border-b-green-primary'
            )}
            type="number"
            placeholder="0.00"
            value={funding}
            onChange={(e) => setFunding(e.target.value)}
          />
        </div>
      </div>
      <div className="flex justify-end gap-x-4 mt-8">
        <Link href={`/hire/${encodeURIComponent(draftId)}/details`}>
          <Button className="">Back</Button>
        </Link>
        <Button
          variant="primary"
          className="relative !px-24 flex items-center justify-center"
          disabled={!funding}
          onClick={() => {
            const woz = engiToWoz(Number(funding));
            mutation.mutate({
              id: draftId,
              funding: woz,
            });
          }}
        >
          <span className={mutation.isLoading ? 'text-transparent' : ''}>
            Continue
          </span>
          {mutation.isLoading && (
            <div className="animate-spin absolute h-5 w-5">
              <AiOutlineLoading className="text-lg text-black absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
            </div>
          )}
        </Button>
      </div>
    </div>
  );
}
