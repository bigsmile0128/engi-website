import React from 'react';

import Tag from '../components/Tag';

export default {
  title: 'Tag',
  component: Tag,
};

const Template = (args) => <Tag {...args}>React</Tag>;

export const Primary = Template.bind({});
Primary.args = {
  className: 'text-white',
  value: 'https://engi.network/jobs/12345',
};
