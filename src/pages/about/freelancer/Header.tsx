import classNames from 'classnames';
import ChevronRight from '~/components/ChevronRight';

type HeaderProps = {
  className?: string;
};

export default function Header({ className }: HeaderProps) {
  return (
    <div className={classNames('', className)}>
      <div className="flex items-center gap-2">
        <ChevronRight className="h-6 w-6" />
        <span className="font-grifter text-4xl -mb-2">Get paid fast</span>
      </div>
      <p className="mt-8 text-secondary text-xl text-center">
        No need to apply. Get paid instantly regardless of your time zone or
        language.
      </p>
    </div>
  );
}
