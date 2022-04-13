import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Checkbox from '~/components/Checkbox';

export default {
  title: 'Checkbox',
  component: Checkbox,
} as ComponentMeta<typeof Checkbox>;

const Template: ComponentStory<typeof Checkbox> = (args) => (
  <Checkbox {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  label: 'Rust',
  name: 'Rust',
  id: 'Rust',
};
