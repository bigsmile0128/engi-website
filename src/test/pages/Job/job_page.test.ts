import { SS_TIMEOUT } from '../config';
import { jobData } from './job_page.data';

xdescribe('Job page', () => {
  test(
    'is the job page matching the figma design?',
    async () => {
      await expect(jobData).toBeSameStory();
    },
    SS_TIMEOUT
  );
});
