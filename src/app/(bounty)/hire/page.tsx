import classNames from 'classnames';
import dayjs from 'dayjs';
import Link from 'next/link';
import { RiRocket2Fill } from 'react-icons/ri';
import Button from '~/components/global/Button/Button';
import GridPattern from '~/components/global/GridPattern/GridPattern';
import { getDrafts } from './[draftId]/api';
import JsonDisplay from '~/components/JsonDisplay';
import { SiGithub } from 'react-icons/si';
import { Drafts } from './Drafts';
import { Draft } from '~/types';

export default async function HirePage() {
  let drafts: Draft[];
  let errorMessage: string | undefined;

  try {
    drafts = await getDrafts();
  } catch (e) {
    errorMessage = e.message;
    drafts = [];
  }

  return (
    <div className="relative mt-12 mb-24">
      <div
        className={classNames(
          'max-w-page relative mb-8 h-[217px] grid place-items-center',
          'border border-white/10'
        )}
      >
        <GridPattern
          className="top-0 left-0"
          id="hire-header"
          offset={-1}
          size={72}
        />
        <h1 className="font-grifter text-5xl text-center lg:text-7xl">
          New Engi Bounty
        </h1>
      </div>
      <div className="max-w-page flex flex-col">
        <div className="flex items-center gap-4 border border-white/60 p-10 bg-[#161B28]/30">
          <RiRocket2Fill className="shrink-0 text-green-primary h-24 w-24 rotate-45" />
          <div className="flex flex-col pr-16">
            <span className="font-grifter text-2xl">Kick off new analysis</span>
            <span className="text-secondary">
              Start a new analysis to create a bounty.
            </span>
          </div>
          <Link className="ml-auto" href="/hire/new">
            <Button className="whitespace-nowrap" variant="primary">
              Create New
            </Button>
          </Link>
        </div>
        <div className="my-12 w-full border-t border-white/30" />
        <span className="font-grifter text-4xl mb-4">Drafts</span>
        {errorMessage ? (
          <JsonDisplay value={errorMessage} />
        ) : (
          <Drafts drafts={drafts} />
        )}
      </div>
    </div>
  );
}
