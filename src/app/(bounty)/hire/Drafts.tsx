import classNames from 'classnames';
import dayjs from 'dayjs';
import Link from 'next/link';
import { SiGithub } from 'react-icons/si';
import JsonDisplay from '~/components/JsonDisplay';
import Button from '~/components/global/Button/Button';
import { Draft } from '~/types';

type DraftsProps = {
  drafts: Draft[];
};

export function Drafts({ drafts }: DraftsProps) {
  return (
    <div className="flex flex-col gap-4">
      {drafts.length > 0 ? (
        drafts
          .sort((a, b) => {
            const createdA = dayjs(a.analysis?.createdOn);
            const createdB = dayjs(b.analysis?.createdOn);
            if (createdA.isBefore(createdB)) {
              return 1;
            } else if (createdB.isBefore(createdA)) {
              return -1;
            }
            return 0;
          })
          .map((draft) => {
            const { analysis } = draft;
            const status = analysis?.status;
            return (
              <div
                key={draft.id}
                className="relative flex flex-col p-10 bg-[#161B28]/30"
              >
                <div className="absolute top-8 right-8 flex items-center gap-4">
                  <div
                    className={classNames(
                      'font-bold text-sm h-8 px-4 grid place-items-center max-h-40',
                      analysis?.status === 'FAILED'
                        ? 'text-red-primary bg-red-primary/10'
                        : 'text-green-primary bg-green-primary/10'
                    )}
                  >
                    {analysis ? analysis.status : 'N/A'}
                  </div>
                </div>
                <span className="font-bold text-xl">
                  {analysis ? (
                    <div className="flex items-center gap-2">
                      <Link
                        href={analysis.repositoryUrl}
                        className="hover:text-green-primary"
                        target="_blank"
                      >
                        <SiGithub className="" />
                      </Link>
                      {analysis.repositoryUrl.replace(/^.*github.com\//, '')}
                    </div>
                  ) : (
                    'Repository'
                  )}
                </span>
                <span className="mt-2">
                  <span className="font-bold text-xl">Started on: </span>
                  <span className="text-secondary">
                    {analysis
                      ? dayjs(analysis.createdOn).format('YYYY-MM-DD hh:mma')
                      : 'N/A'}
                  </span>
                </span>
                {/* TODO: show when description is supported */}
                {/* <span className="mt-4 text-secondary">No description.</span> */}
                {status !== 'FAILED' && (
                  <Link
                    className={classNames(
                      'mt-8 self-start',
                      status !== 'COMPLETED' ? 'pointer-events-none' : ''
                    )}
                    href={`/hire/${encodeURIComponent(draft.id)}/repository`}
                  >
                    <Button
                      variant="primary"
                      disabled={status !== 'COMPLETED'}
                      inProgress={status !== 'COMPLETED'}
                    >
                      Continue
                    </Button>
                  </Link>
                )}
                {analysis?.executionResult && (
                  <JsonDisplay
                    className="mt-8"
                    value={JSON.stringify(
                      analysis.executionResult,
                      undefined,
                      '  '
                    ).slice(0, 1200)}
                  />
                )}
              </div>
            );
          })
      ) : (
        <p className="text-xl text-secondary">There are currently no drafts.</p>
      )}
    </div>
  );
}
