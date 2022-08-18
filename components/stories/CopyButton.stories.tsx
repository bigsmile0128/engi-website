import React from 'react';

import CopyButton from '../CopyButton';

export default {
  title: 'CopyButton',
  component: CopyButton,
};

const Template = (args) => <CopyButton {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  value: 'text',
};
