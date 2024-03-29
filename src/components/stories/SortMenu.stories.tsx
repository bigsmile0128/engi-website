import React from 'react';
import { OrderByDirection } from '~/types';

import SortMenu from '../SortMenu';

export default {
  title: 'SortMenu',
  component: SortMenu,
};

const Template = (args) => (
  <div className="h-40">
    <SortMenu {...args} />
  </div>
);

export const Default = Template.bind({});

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
Default.args = {
  className: 'ml-24',
  onChange: () => {},
  onChangeSortDirection: () => {},
  options,
  sortDirection: OrderByDirection.DESC,
  value: options[0],
};
