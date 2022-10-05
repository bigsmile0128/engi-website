import React from 'react';
import Email from '~/components/modules/settings/Email/Email';
import JobPreference from '~/components/modules/settings/JobPreference/JobPreference';
import Notifications from '~/components/modules/settings/Notifications/Notifications';
import Password from '~/components/modules/settings/Password/Password';
import Payment from '~/components/modules/settings/Payment/Payment';
import PersonalInfo from '~/components/modules/settings/PersonalInfo/PersonalInfo';
import UploadAvatar from '~/components/modules/settings/UploadAvatar/UploadAvatar';
import { SETTINGS_TAB } from '../Settings.utils';

interface Props {
  selectedTab: SETTINGS_TAB;
}

const mapTabToComponent: Record<SETTINGS_TAB, React.ReactNode> = {
  [SETTINGS_TAB.EMAIL]: <Email />,
  [SETTINGS_TAB.PERSONAL_INFO]: <PersonalInfo />,
  [SETTINGS_TAB.UPLOAD_AVATAR]: <UploadAvatar />,
  [SETTINGS_TAB.PASSWORD]: <Password />,
  [SETTINGS_TAB.NOTIFICATION]: <Notifications />,
  [SETTINGS_TAB.PAYMENT]: <Payment />,
  [SETTINGS_TAB.JOB_PREF]: <JobPreference />,
};

function SettingsPanel({ selectedTab }: Props) {
  return <>{mapTabToComponent[selectedTab]}</>;
}

export default SettingsPanel;
