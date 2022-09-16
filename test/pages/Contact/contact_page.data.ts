import { Specification } from '../../../types';
import { v4 as uuidv4 } from 'uuid';

const checkId: string = uuidv4();

export const contactUsData: Specification = {
  check_id: checkId,
  component: 'Contact Page',
  height: '600',
  path: 'Pages',
  story: 'Default',
  width: '800',
  repository: 'engi-network/website',
  url_check_frame: '',
  dataPath: '../same-story-api/test/data/Contact',
  debug: true,
};