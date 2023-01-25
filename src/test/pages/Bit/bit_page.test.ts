import { SS_TIMEOUT } from '../config';
import { bitData } from './bit_page.data';

xdescribe('Bit page', () => {
  test(
    'is the bit page matching the figma design?',
    async () => {
      await expect(bitData).toBeSameStory();
    },
    SS_TIMEOUT
  );
});
