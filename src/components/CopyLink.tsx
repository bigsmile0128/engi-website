import classNames from 'classnames';
import CopyButton from './CopyButton';

interface CopyLinkProps {
  className?: string;
  value?: string;
}

export default function CopyLink({ className, value = '' }: CopyLinkProps) {
  return (
    <div className={classNames('flex border border-white/30', className)}>
      <input
        type="text"
        disabled
        value={value}
        className="flex-1 p-3 pr-0 bg-transparent text-secondary text-sm truncate"
      />
      <CopyButton
        className="py-2 px-3 text-green-primary hover:text-green-primary/80"
        value={value}
      />
    </div>
  );
}
