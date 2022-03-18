import React from 'react';

import TimeEstimate from '../components/TimeEstimate';

export default {
  title: 'TimeEstimate',
  component: TimeEstimate,
};

const Template = (args) => <TimeEstimate {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  duration: '2 hours',
};
