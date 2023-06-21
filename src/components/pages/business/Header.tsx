import classNames from 'classnames';
import Link from 'next/link';
import ChevronRight from '~/components/ChevronRight';
import Button from '~/components/global/Button/Button';

type HeaderProps = {
  className?: string;
};

export default function Header({ className }: HeaderProps) {
  return (
    <div className={classNames('', className)}>
      <div className="flex items-start tablet:items-center gap-2">
        <ChevronRight className="h-5 w-5 mt-1 tablet:mt-0 tablet:h-11 tablet:w-11 xl:h-16 xl:w-16" />
        <span
          className={classNames(
            'flex items-center flex-wrap gap-3 tablet:gap-4 desktop:gap-5',
            'font-grifter text-4xl tablet:text-6xl desktop:text-8xl xl:text-9xl'
          )}
        >
          <span className="-mb-2 tablet:-mb-4 desktop:-mb-8">Build</span>
          <span className="-mb-2 tablet:-mb-4 desktop:-mb-8">products</span>
          <span className="-mb-2 tablet:-mb-4 desktop:-mb-8">faster</span>
        </span>
      </div>
      <p className="mt-8 text-secondary text-xl text-center">
        No recruiting, no interviewing, no contracts. Engage worldwide talent
        and receive qualty code instantly
      </p>
      <div className="flex justify-center mt-8">
        <Link href="/login">
          <Button variant="primary">Get Started</Button>
        </Link>
      </div>
    </div>
  );
}
