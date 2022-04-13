import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import TimeEstimate from '~/components/TimeEstimate';

export default {
  title: 'TimeEstimate',
  component: TimeEstimate,
} as ComponentMeta<typeof TimeEstimate>;

const Template: ComponentStory<typeof TimeEstimate> = (args) => (
  <TimeEstimate {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  duration: '2 hours',
};
