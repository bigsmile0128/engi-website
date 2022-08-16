import React from 'react';

import ProgressBar from '../ProgressBar';

export default {
  title: 'ProgressBar',
  component: ProgressBar,
};

const Template = (args) => <ProgressBar {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  percentage: 0.5,
  label: '5/10',
};
