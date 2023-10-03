import pMinDelay from 'p-min-delay';
import { useMutation } from 'react-query';
import { Draft } from '~/types';
import chainAPI from '~/utils/polkadot/chainAPI';

export default function usePostBounty() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return useMutation<any, Error, any>(
    async ({
      walletId,
      draft,
      source,
    }: {
      draft: Draft;
      source: string;
      walletId: string;
    }) => {
      if (!isValidDraft(draft)) {
        throw Error('Draft is invalid.');
      }

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
          draft.analysis?.branch,
          draft.analysis?.commit,
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
}

export function isValidDraft(draft: Draft) {
  return (
    draft.funding &&
    draft.name &&
    draft.analysis &&
    draft.analysis.technologies &&
    draft.analysis.repositoryUrl &&
    draft.analysis.branch &&
    draft.analysis.commit &&
    draft.analysis.tests
  );
}
