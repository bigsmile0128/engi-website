import { ChevronLeftIcon } from '@heroicons/react/outline';
import classNames from 'classnames';
import Link from 'next/link';

type HeaderProps = {
  bountyId: string;
  className?: string;
};

export default function Header({ bountyId, className }: HeaderProps) {
  return (
    <div className={classNames('flex items-center', className)}>
      <Link
        href={`/bounty/${bountyId}/submission`}
        className="hover:text-green-primary p-2"
      >
        <ChevronLeftIcon className="h-5 w-5" />
      </Link>
      <div className="shrink-0 ml-2">
        <div className="h-12 w-12 border-2 border-white/30 grid place-items-center font-bold text-2xl rounded-full bg-secondary/40">
          5F
        </div>
      </div>
      <div className="ml-4 -mb-2 font-grifter text-xl truncate">
        5FLCw1SJBaBDpTGduFdYqonzf2Arsg1dYoaNMa3776w3nLDH
      </div>
    </div>
  );
}
