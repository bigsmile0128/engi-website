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
      <Notification
        className="w-full"
        description={notifications[0].description}
        unread
      />
      <p className="mt-16 mb-4 font-grifter text-3xl">Earlier</p>
      {notifications.slice(1).map(({ description, unread }) => (
        <Notification
          key={description}
          description={description}
          unread={unread}
        />
      ))}
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
        'p-8 flex items-start gap-6 bg-secondary/40',
        className
      )}
    >
      <div className="relative shrink-0">
        <Avvvatars value="MB" size={48} />
        {unread && (
          <div className="absolute h-2 w-2 bg-green-primary rounded-full translate-y-center -translate-x-full -left-3" />
        )}
      </div>
      <div className="flex-1 flex flex-row justify-between">
        <span className="text-sm">
          <span className="font-bold">Michael Betten posted</span>
          {': '}
          <span>{description}</span>
        </span>
        <span className="text-sm text-secondary">40 min ago</span>
      </div>
    </div>
  );
}
