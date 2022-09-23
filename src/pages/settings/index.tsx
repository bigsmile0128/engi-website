import type { NextPage } from 'next';
import Meta from '~/components/global/Meta/Meta';
import SettingContainer from '~/components/pages/settings/Settings.container';

const Settings: NextPage = () => {
  return (
    <div>
      <Meta title="Engi" />
      <SettingContainer />
    </div>
  );
};

export default Settings;
