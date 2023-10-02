'use client';

import classNames from 'classnames';
import pMinDelay from 'p-min-delay';
import { useEffect } from 'react';
import { AiOutlineLoading } from 'react-icons/ai';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';
import Button from '~/components/global/Button/Button';
import { Draft } from '~/types';
import { useUser } from '~/utils/contexts/userContext';
import chainAPI from '~/utils/polkadot/chainAPI';

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
      // TODO: disable based on draft fields
      disabled={false}
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

export const usePostBounty = () =>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  useMutation<any, Error, any>(
    async ({
      walletId,
      draft,
      source,
    }: {
      draft: Draft;
      source: string;
      walletId: string;
    }) => {
      if (typeof window === 'undefined') return;

      const {
        web3FromSource,
        web3Enable,
        // eslint-disable-next-line @typescript-eslint/no-var-requires
      } = require('@polkadot/extension-dapp');

      const api = await chainAPI();

      // this needs to be called first, before other requests
      // add 1 sec min delay to prevent flash of loader
      await pMinDelay(web3Enable('Engi'), 1000);

      const injector = await web3FromSource(source);
      return api.tx.jobs
        .createJob(
          draft?.funding?.toString(),
          draft.analysis?.technologies,
          draft.analysis?.repositoryUrl,
          draft.branch,
          draft.commit,
          draft.analysis?.tests?.map((test) => ({
            id: test.id,
            result: test.result,
            required: true,
          })),
          draft.name,
          [draft.isEditable, draft.isAddable, draft.isDeletable]
        )
        .signAndSend(
          walletId,
          { signer: injector.signer },
          ({ status, events }) => {
            if (status.isInBlock) {
              console.log(
                `Completed at block hash #${status.asInBlock.toString()}`
              );
              events
                .filter(({ event }) => api.events.jobs.JobCreated.is(event))
                .forEach(
                  ({
                    event: {
                      data: [result],
                    },
                  }) => {
                    console.log('Result', result);
                  }
                );
            } else {
              console.log(`Current status: ${status.type}`);
            }
          }
        )
        .catch((error: any) => {
          console.log('Transaction failed.', error);
        });
    }
  );
