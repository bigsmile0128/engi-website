import { getCurrentUser } from '~/app/(user)/api';
import NotificationSettings from './NotificationSettings';

export default async function NotificationSettingsContainer() {
  const user = await getCurrentUser();
  return <NotificationSettings data={user} />;
}
