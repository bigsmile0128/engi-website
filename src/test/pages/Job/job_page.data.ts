import { Specification } from 'same-story-jest-plugin/lib/models/specification';
import { v4 as uuidv4 } from 'uuid';

const checkId: string = uuidv4();

export const jobData: Specification = {
  check_id: checkId,
  component: 'Job Page',
  height: '600',
  path: 'Pages',
  story: 'Default',
  width: '800',
  repository: 'engi-network/website',
  url_check_frame: '',
  dataPath: '../same-story-api/test/data/Job',
  debug: true,
};