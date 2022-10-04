import { Specification } from 'same-story-jest-plugin/lib/models/specification';
import { v4 as uuidv4 } from 'uuid';

const checkId: string = uuidv4();

export const jobsData: Specification = {
  check_id: checkId,
  component: 'Jobs Page',
  dataPath: '../same-story-api/test/data/Jobs',
  debug: true,
  height: '600',
  path: 'Pages',
  repository: 'engi-network/website',
  story: 'Default',
  url_check_frame: '',
  width: '800',
};
