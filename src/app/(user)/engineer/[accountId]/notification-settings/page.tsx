'use client';

import classNames from 'classnames';
import IncompleteBanner from '~/components/IncompleteBanner';
import Switch from '~/components/global/Switch/Switch';

export default function NotificationSettings() {
  // TODO: hook up to user settings
  return (
    <div className={classNames('w-full self-start bg-secondary/40 p-9')}>
      <IncompleteBanner className="mb-12" />
      <p className="font-bold text-2xl">Notification Settings</p>
      <p className="mt-4 text-white/80">
        Do you wish to receive the following emails?
      </p>
      <div className="my-8 border-t border-white/30" />
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <span className="text-xl">Weekly Newsletter</span>
          <Switch checked={false} onChange={() => {}} />
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xl">New bounties</span>
          <Switch checked={false} onChange={() => {}} />
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xl">Technical updates</span>
          <Switch checked={false} onChange={() => {}} />
        </div>
      </div>
    </div>
  );
}
