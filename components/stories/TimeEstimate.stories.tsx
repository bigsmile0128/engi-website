import React from 'react';

import TimeEstimate from '../TimeEstimate';

export default {
  title: 'TimeEstimate',
  component: TimeEstimate,
};

const Template = (args) => <TimeEstimate {...args} />;

export const Default = Template.bind({});
Default.args = {
  duration: '2 hours',
};
