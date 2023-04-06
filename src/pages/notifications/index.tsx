import Avvvatars from 'avvvatars-react';
import classNames from 'classnames';

type NotificationsProps = {
  className?: string;
};

const notifications = [
  {
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus in elit vel mauris tincidunt porta.',
    unread: true,
  },
  {
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus in elit vel mauris tincidunt.',
    unread: false,
  },
  {
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus in elit vel mauris.',
    unread: false,
  },
];

export default function Notifications({ className }: NotificationsProps) {
  return (
    <div className={classNames('max-w-page py-24', className)}>
      <h1 className="font-grifter text-5xl">Notifications</h1>
      <div className="mt-16 mb-4 flex items-center justify-between">
        <p className="font-grifter text-3xl">New</p>
        <button className="font-medium underline focus-green-primary hover:text-green-primary">
          Mark all as read
        </button>
      </div>
      <div className="w-full backdrop-blur-[100px]">
        <Notification
          className="w-full"
          description={notifications[0].description}
          unread
        />
      </div>
      <p className="mt-16 mb-4 font-grifter text-3xl">Earlier</p>
      <div className="w-full backdrop-blur-[100px] flex flex-col divide-y divide-white/30">
        {notifications.slice(1).map(({ description, unread }) => (
          <Notification
            key={description}
            description={description}
            unread={unread}
          />
        ))}
      </div>
    </div>
  );
}

type NotificationProps = {
  className?: string;
  description: string;
  unread: boolean;
};

function Notification({ className, description, unread }: NotificationProps) {
  return (
    <div
      className={classNames(
        'relative p-8 flex items-start gap-6 bg-secondary/10 hover:bg-secondary/80',
        className
      )}
    >
      <div className="relative shrink-0">
        <Avvvatars value="MB" size={48} />
        {unread && (
          <div className="absolute h-2 w-2 bg-green-primary rounded-full translate-y-center -translate-x-full -left-3" />
        )}
      </div>
      {unread && (
        <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-green-primary" />
      )}
      <div className="flex-1 flex flex-row justify-between gap-24">
        <span className="text-sm">
          <span className="font-bold">Michael Betten posted</span>
          {': '}
          <span>{description}</span>
        </span>
        <span className="text-sm text-secondary whitespace-nowrap">
          40 min ago
        </span>
      </div>
    </div>
  );
}
