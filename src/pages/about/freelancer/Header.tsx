import classNames from 'classnames';
import ChevronRight from '~/components/ChevronRight';
import avatarImg from 'public/img/about/freelancer/avatar.png';
import Image from 'next/image';
import { RiCoinsFill } from 'react-icons/ri';
import Button from '~/components/global/Button/Button';
import Link from 'next/link';

type HeaderProps = {
  className?: string;
};

export default function Header({ className }: HeaderProps) {
  return (
    <div className={classNames('', className)}>
      <div className="flex items-center gap-2">
        <ChevronRight className="h-6 w-6 tablet:h-11 tablet:w-11" />
        <span
          className={classNames(
            'flex items-center flex-wrap gap-3 tablet:gap-4',
            'font-grifter text-4xl tablet:text-6xl'
          )}
        >
          <span className="-mb-2 tablet:-mb-4">Get</span>
          <Image className="hidden tablet:block" src={avatarImg} alt="avatar" />
          <span className="-mb-2 tablet:-mb-4">paid</span>
          <div className="hidden tablet:flex bg-secondary/70 flex items-center justify-center h-20 w-20 rounded-full">
            <RiCoinsFill className="h-8 w-8 text-green-primary" />
          </div>
          <span className="-mb-2 tablet:-mb-4">fast</span>
        </span>
      </div>
      <p className="mt-8 text-secondary text-xl text-center">
        No need to apply. Get paid instantly regardless of your time zone or
        language.
      </p>
      <div className="hidden tablet:flex justify-center mt-8">
        <Link href="/login">
          <Button variant="primary">Get Started</Button>
        </Link>
      </div>
    </div>
  );
}
