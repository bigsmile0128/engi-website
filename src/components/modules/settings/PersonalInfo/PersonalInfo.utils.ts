export enum PERSONAL_INFO_FELID {
  COMPANY_NAME = 'company_name',
  NAME = 'name',
  NICKNAME = 'nickname',
  PHONE = 'phone',
}

export interface PersonalInfoValues {
  [PERSONAL_INFO_FELID.COMPANY_NAME]: string;
  [PERSONAL_INFO_FELID.NAME]: string;
  [PERSONAL_INFO_FELID.NICKNAME]: string;
  [PERSONAL_INFO_FELID.PHONE]: string;
}

export const personalInfoInitialValues = {
  [PERSONAL_INFO_FELID.COMPANY_NAME]: '',
  [PERSONAL_INFO_FELID.NAME]: '',
  [PERSONAL_INFO_FELID.NICKNAME]: '',
  [PERSONAL_INFO_FELID.PHONE]: '',
};
