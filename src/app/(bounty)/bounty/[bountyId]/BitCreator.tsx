import classNames from 'classnames';
import { RiUserFill } from 'react-icons/ri';
import UserAvatar from '~/components/UserAvatar';
import EngiIcon from '~/components/global/icons/EngiIcon';
import { Engineer } from '~/types';

type BitCreatorProps = {
  className?: string;
  data: Engineer;
};

export default function BitCreator({ className, data }: BitCreatorProps) {
  // TODO: update when engineer lookup is available
  return (
    <div
      className={classNames(
        'flex items-start gap-2 overflow-hidden',
        className
      )}
    >
      <div className="shrink-0">
        <UserAvatar
          profileImageUrl={data.profileImageUrl}
          walletId={data.address}
          size={48}
        />
      </div>
      <div className="flex flex-col">
        <span className="font-grifter text-xl inline-block truncate">
          {data.displayName ?? data.address}
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
