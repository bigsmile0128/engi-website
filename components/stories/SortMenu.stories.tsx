import React from 'react';

import SortMenu, { SortDirection } from '../SortMenu';

export default {
  title: 'SortMenu',
  component: SortMenu,
};

const Template = (args) => (
  <div className="h-40">
    <SortMenu {...args} />
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
  sortDirection: SortDirection.DESC,
  onChangeSortDirection: () => {},
};
