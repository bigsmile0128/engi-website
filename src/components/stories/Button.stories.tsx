import React from 'react';

import Button from '~/components/global/Button/Button';

export default {
  title: 'Button',
  component: Button,
};

const Template = (args) => <Button {...args}>Button</Button>;

export const Default = Template.bind({});
Default.args = {
  isLoading: false,
};

export const Primary = Template.bind({});
Primary.args = {
  variant: 'primary',
  isLoading: false,
  inProgress: false,
};

export const Tag = Template.bind({});
Tag.args = {
  variant: 'tag',
  isLoading: false,
};

export const Link = Template.bind({});
Link.args = {
  variant: 'link',
};
