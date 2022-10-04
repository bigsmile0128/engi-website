export enum SETTINGS_TAB {
  EMAIL = 'email',
  JOB_PREF = 'job_preference',
  NOTIFICATION = 'notification',
  PASSWORD = 'password',
  PAYMENT = 'payment',
  PERSONAL_INFO = 'personal_info',
  UPLOAD_AVATAR = 'upload_avatar',
}

export const SETTINGS_LINKS: Array<{ key: SETTINGS_TAB; title: string }> = [
  {
    key: SETTINGS_TAB.PERSONAL_INFO,
    title: 'Personal info',
  },
  {
    key: SETTINGS_TAB.UPLOAD_AVATAR,
    title: 'Upload avatar',
  },
  {
    key: SETTINGS_TAB.PASSWORD,
    title: 'Password',
  },
  {
    key: SETTINGS_TAB.EMAIL,
    title: 'Email',
  },
  {
    key: SETTINGS_TAB.NOTIFICATION,
    title: 'Notifications',
  },
  {
    key: SETTINGS_TAB.PAYMENT,
    title: 'Payment',
  },
  {
    key: SETTINGS_TAB.JOB_PREF,
    title: 'Job preference',
  },
];
