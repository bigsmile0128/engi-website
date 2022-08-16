import React from 'react';

import Button from '../Button';

export default {
  title: 'Button',
  component: Button,
};

const Template = (args) => <Button {...args}>Button</Button>;

export const Primary = Template.bind({});
Primary.args = {
  variant: 'primary',
};

export const Default = Template.bind({});
Default.args = {};
