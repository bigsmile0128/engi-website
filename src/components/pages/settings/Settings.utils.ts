import { AiOutlineUser } from 'react-icons/ai';
import { RiExchangeLine, RiTerminalFill } from 'react-icons/ri';
import { BsChatLeftDots } from 'react-icons/bs';
import DollarIcon from 'public/img/settings/dollar.svg';

export enum SETTINGS_TAB {
  EMAIL = 'email',
  JOB_PREF = 'job_preference',
  NOTIFICATION = 'notification',
  PASSWORD = 'password',
  PAYMENT = 'payment',
  PERSONAL_INFO = 'personal_info',
  UPLOAD_AVATAR = 'upload_avatar',
}

export interface LinkItem {
  icon: (props) => JSX.Element;
  key: SETTINGS_TAB;
  title: string;
}

export const SETTINGS_LINKS: LinkItem[] = [
  {
    key: SETTINGS_TAB.PERSONAL_INFO,
    title: 'Account info',
    icon: AiOutlineUser,
  },
  {
    key: SETTINGS_TAB.UPLOAD_AVATAR,
    title: 'Avatar',
    icon: AiOutlineUser,
  },
  {
    key: SETTINGS_TAB.PASSWORD,
    title: 'Password',
    icon: RiExchangeLine,
  },
  {
    key: SETTINGS_TAB.EMAIL,
    title: 'Email',
    icon: BsChatLeftDots,
  },
  {
    key: SETTINGS_TAB.NOTIFICATION,
    title: 'Notifications',
    icon: RiExchangeLine,
  },
  {
    key: SETTINGS_TAB.PAYMENT,
    title: 'Payment details',
    icon: DollarIcon,
  },
  {
    key: SETTINGS_TAB.JOB_PREF,
    title: 'Job preference',
    icon: RiTerminalFill,
  },
];

export const mapSettingsTabToTitle: Record<SETTINGS_TAB, string> = {
  [SETTINGS_TAB.EMAIL]: 'Verify your email',
  [SETTINGS_TAB.JOB_PREF]: 'What languages does your company use?',
  [SETTINGS_TAB.NOTIFICATION]: 'Notification Settings',
  [SETTINGS_TAB.PASSWORD]: 'Password settings',
  [SETTINGS_TAB.PAYMENT]: 'Payment settings',
  [SETTINGS_TAB.PERSONAL_INFO]: 'Update your account info',
  [SETTINGS_TAB.UPLOAD_AVATAR]: 'Upload your avatar',
};
