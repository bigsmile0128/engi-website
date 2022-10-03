export enum PERSONAL_INFO_FELID {
  NAME = 'name',
  NICKNAME = 'nickname',
  COMPANY_NAME = 'compony_name',
}

export interface PersonalInfoValues {
  [PERSONAL_INFO_FELID.COMPANY_NAME]: string;
  [PERSONAL_INFO_FELID.NAME]: string;
  [PERSONAL_INFO_FELID.NICKNAME]: string;
}

export const personalInfoInitialValues = {
  [PERSONAL_INFO_FELID.COMPANY_NAME]: '',
  [PERSONAL_INFO_FELID.NAME]: '',
  [PERSONAL_INFO_FELID.NICKNAME]: '',
};
