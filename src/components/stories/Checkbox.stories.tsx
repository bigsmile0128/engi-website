import React from 'react';

import Checkbox from '../global/Checkbox/Checkbox';

export default {
  title: 'Checkbox',
  component: Checkbox,
};

const Template = (args) => <Checkbox {...args} />;

export const Default = Template.bind({});
Default.args = {
  label: 'Rust',
  id: 'Rust',
};
