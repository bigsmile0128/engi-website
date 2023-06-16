import { StorybookTest } from '@engi.network/design-matcher/plugin/types';

const mockTest: StorybookTest = {
  component: 'EngineerStats',
  story: 'default',
  design: 'designs/engineer-stats.png',
};

test.skip('should match design', async () => {
  await expect(mockTest).toMatchDesign();
}, 10000);
