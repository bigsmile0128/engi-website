import React from 'react';

import SelectMenu from '../SelectMenu';

export default {
  title: 'SelectMenu',
  component: SelectMenu,
};

const Template = (args) => (
  <div className="h-40">
    <SelectMenu {...args} />
  </div>
);

export const Primary = Template.bind({});

const options = [
  {
    label: 'Option 1',
    value: 1,
  },
  {
    label: 'Option 2',
    value: 2,
  },
];

Primary.args = {
  className: 'ml-24',
  options,
  value: options[0],
  onChange: () => {},
  buttonLabel: 'Status',
};
