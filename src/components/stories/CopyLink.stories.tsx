import React from 'react';

import CopyLink from '../CopyLink';

export default {
  title: 'CopyLink',
  component: CopyLink,
};

const Template = (args) => <CopyLink {...args} />;

export const Default = Template.bind({});
Default.args = {
  className: 'w-64',
  value: 'https://engi.network/bounty/12345',
};
