import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import GridPattern from '~/components/GridPattern';

export default {
  title: 'GridPattern',
  component: GridPattern,
} as ComponentMeta<typeof GridPattern>;

const Template: ComponentStory<typeof GridPattern> = (args) => (
  <GridPattern {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  size: 60,
  offset: 0,
};
