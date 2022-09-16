import { SS_TIMEOUT } from '../config';
import { jobsData } from './jobs_page.data';

describe('Jobs page', () => {
  test(
    'is the jobs page matching the figma design?',
    async () => {
      await expect(jobsData).toBeSameStory();
    },
    SS_TIMEOUT
  );
});
