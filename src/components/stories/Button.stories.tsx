import React from 'react';

import Button from '~/components/global/Button/Button';

export default {
  title: 'Button',
  component: Button,
};

const Template = (args) => <Button {...args}>Button</Button>;

export const Default = Template.bind({});
Default.args = {};

export const Primary = Template.bind({});
Primary.args = {
  variant: 'primary',
};

export const Tag = Template.bind({});
Tag.args = {
  variant: 'tag',
};
