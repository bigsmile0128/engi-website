import { Specification } from 'same-story-jest-plugin/lib/models/specification';
import { v4 as uuidv4 } from 'uuid';

const checkId: string = uuidv4();

export const contactUsData: Specification = {
  check_id: checkId,
  component: 'Contact Page',
  dataPath: '../same-story-api/test/data/Contact',
  debug: true,
  height: '100',
  path: 'Pages',
  repository: 'engi-network/website',
  story: 'Default',
  url_check_frame: '',
  width: '1400',
};
