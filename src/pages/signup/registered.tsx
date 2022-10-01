import classNames from 'classnames';
import Link from 'next/link';
import { isDev } from '~/utils';

export default function Registered() {
  return (
    <div>
      <h1 className="font-bold text-5xl mb-4">Congratulations!</h1>
      <p className="mb-8">
        {`You've set up your wallet. You can start working on Engi jobs.`}
      </p>
      <p className="mb-8">{`We're happy to meet you!`}</p>
      <Link href={isDev() ? '/jobs' : '/'}>
        <a>
          <button
            className={classNames(
              'px-16 py-4 text-white font-bold',
              'bg-[#00000022] hover:bg-gray-700 active:bg-gray-600 border border-white outline-none focus-visible:ring-2'
            )}
          >
            See Jobs
          </button>
        </a>
      </Link>
    </div>
  );
}
