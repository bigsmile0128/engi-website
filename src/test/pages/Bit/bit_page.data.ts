import { Specification } from 'same-story-jest-plugin/lib/models/specification';
import { v4 as uuidv4 } from 'uuid';

const checkId: string = uuidv4();

export const bitData: Specification = {
  check_id: checkId,
  component: 'Bit Page',
  dataPath: '../same-story-api/test/data/Bit',
  debug: true,
  height: '600',
  path: 'Pages',
  repository: 'engi-network/website',
  story: 'Default',
  url_check_frame: '',
  width: '800',
};
