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
        'max-w-page mt-16 mb-24 flex flex-col items-center text-center',
        className
      )}
    >
      <RiCheckboxCircleLine className="text-green-primary h-40 w-40" />
      <h1 className="font-bold text-5xl mt-8">Logged in!</h1>
      <p className="text-lg mt-8">{'Welcome back!'}</p>
      <Link href="/bits" className="mt-8">
        <Button className="!px-16">Browse Bounties</Button>
      </Link>
    </div>
  );
}
