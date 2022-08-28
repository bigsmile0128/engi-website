import React from 'react';

import EngiAmount from '../EngiAmount';

export default {
  title: 'EngiAmount',
  component: EngiAmount,
};

const Template = (args) => <EngiAmount {...args} />;

export const Default = Template.bind({});
Default.args = {
  value: 100000000000,
};
