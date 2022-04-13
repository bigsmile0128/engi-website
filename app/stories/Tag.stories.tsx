import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Tag from '~/components/Tag';

export default {
  title: 'Tag',
  component: Tag,
} as ComponentMeta<typeof Tag>;

const Template: ComponentStory<typeof Tag> = (args) => (
  <Tag {...args}>React</Tag>
);

export const Primary = Template.bind({});
Primary.args = {
  className: 'text-white',
};
