import { Specification } from '../../../types';
import { v4 as uuidv4 } from 'uuid';

const checkId: string = uuidv4();

export const contactUsData: Specification = {
  check_id: checkId,
  component: 'ContactUs',
  height: '600',
  path: 'Pages/Contact Page',
  story: 'Default',
  width: '800',
  repository: 'engi-network/wetsite',
  url_check_frame: '',
  dataPath: '../../../same-story-api/test/data',
};
