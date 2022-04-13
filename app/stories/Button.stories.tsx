import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Button from '~/components/Button';

export default {
  title: 'Button',
  component: Button,
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => (
  <Button {...args}>Button</Button>
);

export const Primary = Template.bind({});
Primary.args = {};
