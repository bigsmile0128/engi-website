import React from 'react';

import Tag from '../global/Tag/Tag';

export default {
  title: 'Tag',
  component: Tag,
};

const Template = (args) => <Tag {...args}>React</Tag>;

export const Default = Template.bind({});
Default.args = {
  className: 'text-white',
  value: 'https://engi.network/bounty/12345',
};
