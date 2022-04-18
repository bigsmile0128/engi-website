import React from 'react';

import CopyLink from '../CopyLink';

export default {
  title: 'CopyLink',
  component: CopyLink,
};

const Template = (args) => <CopyLink {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  className: 'w-64',
  value: 'https://engi.network/jobs/12345',
};
