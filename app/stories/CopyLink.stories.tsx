import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import CopyLink from '~/components/CopyLink';

export default {
  title: 'CopyLink',
  component: CopyLink,
} as ComponentMeta<typeof CopyLink>;

const Template: ComponentStory<typeof CopyLink> = (args) => (
  <CopyLink {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  className: 'w-64',
  value: 'https://engi.network/jobs/12345',
};
