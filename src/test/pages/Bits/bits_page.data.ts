import { Specification } from 'same-story-jest-plugin/lib/models/specification';
import { v4 as uuidv4 } from 'uuid';

const checkId: string = uuidv4();

export const bitsData: Specification = {
  check_id: checkId,
  component: 'Bits Page',
  dataPath: '../same-story-api/test/data/Bits',
  debug: true,
  height: '600',
  path: 'Pages',
  repository: 'engi-network/website',
  story: 'Default',
  url_check_frame: '',
  width: '800',
};
