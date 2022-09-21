import React, { useState } from 'react';

import Steps from '../Steps';

export default {
  title: 'Steps',
  component: Steps,
};

const Template = (args) => {
  const [current, setCurrent] = useState(args.current ?? 0);
  return <Steps {...args} current={current} onChange={setCurrent} />;
};

export const Default = Template.bind({});
Default.args = {
  className: '',
  current: 1,
  steps: [
    { title: 'Repository' },
    { title: 'Tests' },
    { title: 'Details' },
    { title: 'Funding' },
    { title: 'Preview' },
  ],
};
