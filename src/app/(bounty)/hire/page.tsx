import classNames from 'classnames';
import dayjs from 'dayjs';
import Link from 'next/link';
import { RiRocket2Fill } from 'react-icons/ri';
import IncompleteBanner from '~/components/IncompleteBanner';
import Button from '~/components/global/Button/Button';
import GridPattern from '~/components/global/GridPattern/GridPattern';

export default async function HirePage() {
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
      <div className="max-w-page mb-8">
        <IncompleteBanner />
      </div>
      <div className="max-w-page flex flex-col">
        <div className="flex items-center gap-4 border border-white/60 p-10 bg-[#161B28]/30">
          <RiRocket2Fill className="shrink-0 text-green-primary h-24 w-24 rotate-45" />
          <div className="flex flex-col pr-16">
            <span className="font-grifter text-2xl">Kick off new analysis</span>
            <span className="text-secondary">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
              in elit vel mauris tincidunt porta.
            </span>
          </div>
          <Link className="ml-auto" href="/hire/new">
            <Button className="whitespace-nowrap" variant="primary">
              Create New
            </Button>
          </Link>
        </div>
        <div className="my-8 w-full border-t border-white/30" />
        <span className="font-grifter text-4xl mb-4">Drafts</span>
        <div className="relative flex flex-col p-10 bg-[#161B28]/30">
          <div className="absolute top-8 right-8 flex items-center gap-4">
            <span className="font-bold">Status: </span>
            <div className="font-bold text-sm h-8 px-4 grid place-items-center bg-green-primary/10 text-green-primary">
              Done
            </div>
          </div>
          <span className="font-bold text-xl">Repository</span>
          <span className="mt-2">
            <span className="font-bold text-xl">Started on: </span>
            <span className="text-secondary">
              {dayjs().format('YYYY-MM-DD')}
            </span>
          </span>
          <span className="mt-4 text-secondary">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus in
            elit vel mauris tincidunt porta.
          </span>
          <Button className="mt-12 self-start" variant="primary">
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
}
