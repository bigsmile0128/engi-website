import Avvvatars from 'avvvatars-react';
import classNames from 'classnames';

type BitCreatorProps = {
  className?: string;
  data?: string;
  isLoading?: boolean;
};

export default function BitCreator({
  className,
  data,
  isLoading,
}: BitCreatorProps) {
  return (
    <div
      className={classNames(
        'flex items-center gap-2 overflow-hidden',
        isLoading ? 'children:skeleton' : '',
        className
      )}
    >
      <div className="shrink-0">
        {data ? (
          <Avvvatars value={data} style="shape" size={48} />
        ) : (
          <div className="h-12 w-12" />
        )}
      </div>
      <span className="font-grifter text-xl inline-block truncate">
        {data ?? 'Author N/A'}
      </span>
    </div>
  );
}