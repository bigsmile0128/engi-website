import React from 'react';

import Steps from '../Steps';

export default {
  title: 'Steps',
  component: Steps,
};

const Template = (args) => <Steps {...args} />;

export const Default = Template.bind({});
Default.args = {
  className: 'p-6 bg-white/20',
  current: 1,
  onChange: () => {},
  direction: 'horizontal',
  steps: [
    { title: 'Repository' },
    { title: 'Tests' },
    { title: 'Details' },
    { title: 'Funding' },
    { title: 'Preview' },
  ],
};
