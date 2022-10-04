import { Specification } from 'same-story-jest-plugin/lib/models/specification';
import { v4 as uuidv4 } from 'uuid';

const checkId: string = uuidv4();

export const jobData: Specification = {
  check_id: checkId,
  component: 'Job Page',
  dataPath: '../same-story-api/test/data/Job',
  debug: true,
  height: '600',
  path: 'Pages',
  repository: 'engi-network/website',
  story: 'Default',
  url_check_frame: '',
  width: '800',
};
