import React, { useState } from 'react';

import Switch from '../Switch';

export default {
  title: 'Switch',
  component: Switch,
};

const Template = (args) => {
  const [checked, setChecked] = useState(args.checked ?? false);
  return <Switch {...args} checked={checked} onChange={setChecked} />;
};

export const Default = Template.bind({});
Default.args = {
  className: '',
  checked: false,
  label: 'Switch label',
};
