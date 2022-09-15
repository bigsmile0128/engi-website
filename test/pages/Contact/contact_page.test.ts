import { contactUsData } from './contact_page.data';

const timeout = 60_000 * 5;

describe('Contact page', () => {
  test(
    'are they same story?',
    async () => {
      await expect(contactUsData).toBeSameStory();
    },
    timeout
  );
});
