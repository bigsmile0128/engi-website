import { SS_TIMEOUT } from '../config';
import { bitsData } from './bits_page.data';

xdescribe('Bits page', () => {
  test(
    'is the bits page matching the figma design?',
    async () => {
      await expect(bitsData).toBeSameStory();
    },
    SS_TIMEOUT
  );
});
