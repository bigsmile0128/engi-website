import Avvvatars from 'avvvatars-react';
import classNames from 'classnames';
import { RiUserFill } from 'react-icons/ri';
import EngiIcon from '~/components/global/icons/EngiIcon';

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
        'flex items-start gap-2 overflow-hidden',
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
      <div className="flex flex-col">
        <span className="font-grifter text-xl inline-block truncate">
          {data ?? 'Author N/A'}
        </span>
        <div className="flex items-center gap-2">
          <div className="h-5 w-5 grid place-items-center bg-secondary rounded-full">
            <EngiIcon className="-ml-0.5 h-3 w-auto text-green-primary" />
          </div>
          <span>
            <span className="font-bold">N/A</span> spent on bounties
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-5 w-5 grid place-items-center bg-secondary rounded-full">
            <RiUserFill className="h-3 w-auto text-green-primary" />
          </div>
          <span>member since N/A</span>
        </div>
      </div>
    </div>
  );
}
