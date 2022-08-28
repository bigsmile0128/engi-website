import React from 'react';

import EngiAmount from '../EngiAmount';

export default {
  title: 'EngiAmount',
  component: EngiAmount,
};

const Template = (args) => <EngiAmount {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  value: 100000000000,
};
