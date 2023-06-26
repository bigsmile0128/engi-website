'use client';

import classNames from 'classnames';
import { useState } from 'react';
import Switch from '~/components/global/Switch/Switch';
import { useUser } from '~/utils/contexts/userContext';
import { isCurrentUser } from '../utils';
import { useRouter } from 'next/router';

export default function Settings({
  params,
}: {
  params: {
    accountId: string;
  };
}) {
  const router = useRouter();
  const { accountId } = params;
  const { user } = useUser();
  const [notificationSettings, setNotificationSettings] = useState<
    Record<string, boolean>
  >({});

  if (!isCurrentUser(accountId, user)) {
    router.push('/engineer/current/settings');
  }

  return (
    <div className={classNames('w-full self-start bg-secondary/40 p-9')}>
      <p className="font-bold text-2xl">Notification Settings</p>
      <p className="mt-4 text-white/80">
        Do you wish to receive the following emails?
      </p>
      <div className="my-8 border-t border-white/30" />
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <span className="text-xl">Weekly Newsletter</span>
          <Switch
            checked={notificationSettings?.weeklyNewsletter ?? false}
            onChange={(checked) =>
              setNotificationSettings({
                ...notificationSettings,
                weeklyNewsletter: checked,
              })
            }
          />
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xl">New bounties</span>
          <Switch
            checked={notificationSettings?.jobAlerts ?? false}
            onChange={(checked) =>
              setNotificationSettings({
                ...notificationSettings,
                jobAlerts: checked,
              })
            }
          />
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xl">Technical updates</span>
          <Switch
            checked={notificationSettings?.technicalUpdates ?? false}
            onChange={(checked) =>
              setNotificationSettings({
                ...notificationSettings,
                technicalUpdates: checked,
              })
            }
          />
        </div>
      </div>
    </div>
  );
}
