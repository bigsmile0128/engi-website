'use client';

import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Switch from '~/components/global/Switch/Switch';
import { CurrentUserInfo } from '~/types';
import useUpdateUser from '../useUpdateUser';

type NotificationSettingsProps = {
  data: CurrentUserInfo;
};

export default function NotificationSettings({
  data,
}: NotificationSettingsProps) {
  const mutation = useUpdateUser();
  const [emailSettings, setEmailSettings] = useState(data.emailSettings);

  useEffect(() => {
    if (mutation.isSuccess) {
      toast.success('Updated notification settings.');
    } else if (mutation.isError) {
      toast.error('Failed to update notification settings.');
    }
  }, [mutation, mutation.isSuccess, mutation.isError]);

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
            checked={emailSettings.weeklyNewsletter}
            onChange={(checked) => {
              const newEmailSettings = {
                ...emailSettings,
                weeklyNewsletter: checked,
              };
              setEmailSettings(newEmailSettings);
              mutation.mutate({ emailSettings: newEmailSettings });
            }}
          />
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xl">New bounties</span>
          <Switch
            checked={emailSettings.jobAlerts}
            onChange={(checked) => {
              const newEmailSettings = {
                ...emailSettings,
                jobAlerts: checked,
              };
              setEmailSettings(newEmailSettings);
              mutation.mutate({ emailSettings: newEmailSettings });
            }}
          />
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xl">Technical updates</span>
          <Switch
            checked={emailSettings.technicalUpdates}
            onChange={(checked) => {
              const newEmailSettings = {
                ...emailSettings,
                technicalUpdates: checked,
              };
              setEmailSettings(newEmailSettings);
              mutation.mutate({ emailSettings: newEmailSettings });
            }}
          />
        </div>
      </div>
    </div>
  );
}
