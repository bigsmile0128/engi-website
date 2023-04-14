import classNames from 'classnames';
import ChevronRight from '~/components/ChevronRight';
import avatarImg from 'public/img/about/freelancer/avatar.png';
import Image from 'next/image';
import { RiCoinsFill } from 'react-icons/ri';
import Button from '~/components/global/Button/Button';
import Link from 'next/link';
import { HEADER_SUBTITLE } from './content';

type HeaderProps = {
  className?: string;
};

export default function Header({ className }: HeaderProps) {
  return (
    <div className={classNames('', className)}>
      <div className="flex items-center gap-2">
        <ChevronRight className="h-6 w-6 tablet:h-11 tablet:w-11 xl:h-16 xl:w-16" />
        <span
          className={classNames(
            'flex items-center flex-wrap gap-3 tablet:gap-4 desktop:gap-5',
            'font-grifter text-4xl tablet:text-6xl desktop:text-8xl xl:text-9xl'
          )}
        >
          <span className="-mb-2 tablet:-mb-4 desktop:-mb-8">Get</span>
          <Image className="hidden tablet:block" src={avatarImg} alt="avatar" />
          <span className="-mb-2 tablet:-mb-4 desktop:-mb-8">paid</span>
          <div className="hidden tablet:flex bg-secondary/70 items-center justify-center h-20 w-20 rounded-full">
            <RiCoinsFill className="h-8 w-8 text-green-primary" />
          </div>
          <span className="-mb-2 tablet:-mb-4 desktop:-mb-8">fast</span>
        </span>
      </div>
      <p className="mt-8 text-secondary text-xl text-center">
        {HEADER_SUBTITLE}
      </p>
      <div className="hidden tablet:flex justify-center mt-8">
        <Link href="/login">
          <Button variant="primary">Browse Bounties</Button>
        </Link>
      </div>
    </div>
  );
}
