import Avvvatars from 'avvvatars-react';
import classNames from 'classnames';

type JobCreatorProps = {
  className?: string;
  data?: string;
  isLoading?: boolean;
};

export default function JobCreator({
  className,
  data,
  isLoading,
}: JobCreatorProps) {
  return (
    <div
      className={classNames(
        'flex items-center gap-2 overflow-hidden',
        isLoading ? 'children:skeleton' : '',
        className
      )}
    >
      <div className="shrink-0">
        <Avvvatars value={data} style="shape" size={48} />
      </div>
      <span className="font-grifter text-xl inline-block truncate">
        {data ?? 'Author N/A'}
      </span>
    </div>
  );
}
