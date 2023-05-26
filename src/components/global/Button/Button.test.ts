import { StorybookTest } from '@engi.network/design-matcher/plugin/types';

const mockTest: StorybookTest = {
  component: 'Button',
  story: 'Primary',
  args: {
    variant: 'Primary',
  },
  design: 'designs/primary-button.png',
};

test.skip('should match design', async () => {
  await expect(mockTest).toMatchDesign();
});
