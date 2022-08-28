import React from 'react';

import ProgressBar from '../ProgressBar';

export default {
  title: 'ProgressBar',
  component: ProgressBar,
};

const Template = (args) => <ProgressBar {...args} />;

export const Default = Template.bind({});
Default.args = {
  percentage: 0.5,
  label: '5/10',
};
