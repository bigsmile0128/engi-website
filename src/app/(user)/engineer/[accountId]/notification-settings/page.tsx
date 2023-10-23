import { getCurrentUser } from '~/app/(user)/api';
import NotificationSettings from './NotificationSettings';
import { CurrentUserInfo } from '~/types';

export default async function NotificationSettingsContainer() {
  const user = (await getCurrentUser()) as CurrentUserInfo;
  return <NotificationSettings data={user} />;
}
