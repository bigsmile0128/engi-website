import { SENDGRID_LIST_NAME } from '../../types';

export const mapNameToId: Record<SENDGRID_LIST_NAME, string> = {
  [SENDGRID_LIST_NAME.ENGI_NEWSLETTER]: '3b228e62-867a-4a44-9413-b906adb1f287',
  [SENDGRID_LIST_NAME.CONTACT_US]: '9625f53a-048f-4831-ae03-3d12a0194d0f',
};

export const REPLY_EMAIL = 'newsletter@engi.network';

export enum TEMPLATE_NAME {
  CONTACT_US_REPLY = 'contact-us-reply',
  WELCOME_NEWSLETTER = 'welcome-newsletter',
}

export const mapToTemplateId: Record<TEMPLATE_NAME, string> = {
  [TEMPLATE_NAME.CONTACT_US_REPLY]: 'd-13501b86827e488995217d7357938d0b',
  [TEMPLATE_NAME.WELCOME_NEWSLETTER]: 'd-d620f0bb02fc4e7395c69f8dbe77ca82',
};
