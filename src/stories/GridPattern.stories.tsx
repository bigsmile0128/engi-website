import React from 'react';

import GridPattern from '../components/GridPattern';

export default {
  title: 'GridPattern',
  component: GridPattern,
};

const Template = (args) => <GridPattern {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  size: 60,
  offset: 0,
};
