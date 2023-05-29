import { contactUsData } from './contact_page.data';
import { SS_TIMEOUT } from '../config';

xdescribe('Contact page', () => {
  test(
    'is the contact page matching the figma design?',
    async () => {
      await expect(contactUsData).toBeSameStory();
    },
    SS_TIMEOUT
  );
});
