import classNames from 'classnames';
import Link from 'next/link';
import { RiCheckboxCircleLine } from 'react-icons/ri';
import Button from '~/components/global/Button/Button';

type SuccessProps = {
  className?: string;
};

export default function Success({ className }: SuccessProps) {
  return (
    <div
      className={classNames(
        'max-w-page mt-16 mb-24 flex flex-col items-center',
        className
      )}
    >
      <RiCheckboxCircleLine className="text-green-primary h-40 w-40" />
      <h1 className="font-bold text-5xl mt-8">Congratulations!</h1>
      <p className="text-lg mt-8">
        {"You've set up your wallet. You can start working on Engi jobs."}
      </p>
      <p className="text-lg mt-2">{"We're happy to meet you!"}</p>
      <Link href="/jobs">
        <a className="mt-8">
          <Button className="!px-16">Browse Jobs</Button>
        </a>
      </Link>
    </div>
  );
}
