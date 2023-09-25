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
        drafts.map((draft) => {
          const { analysis } = draft;
          return (
            <div
              key={draft.id}
              className="relative flex flex-col p-10 bg-[#161B28]/30"
            >
              <div className="absolute top-8 right-8 flex items-center gap-4">
                <div className="font-bold text-sm h-8 px-4 grid place-items-center bg-green-primary/10 text-green-primary">
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
                    ? dayjs(analysis.createdOn).format('YYYY-MM-DD HH:MM')
                    : 'N/A'}
                </span>
              </span>
              {/* TODO: show when description is supported */}
              {/* <span className="mt-4 text-secondary">No description.</span> */}
              <Link
                className="mt-8 self-start"
                href={`/hire/${encodeURIComponent(draft.id)}`}
              >
                <Button variant="primary">Continue</Button>
              </Link>
              {analysis?.executionResult && (
                <JsonDisplay
                  className="mt-8"
                  value={JSON.stringify(
                    analysis.executionResult,
                    undefined,
                    '  '
                  )}
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
