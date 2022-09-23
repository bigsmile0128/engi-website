import React from 'react';

import GridPattern from '../global/GridPattern/GridPattern';

export default {
  title: 'GridPattern',
  component: GridPattern,
};

const Template = (args) => <GridPattern {...args} />;

export const Default = Template.bind({});
Default.args = {
  size: 60,
  offset: 0,
  id: 'id',
};
