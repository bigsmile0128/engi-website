import React from 'react';

import TextSkeleton from '../TextSkeleton';

export default {
  title: 'TextSkeleton',
  component: TextSkeleton,
};

const Template = (args) => <TextSkeleton {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  numLines: 4,
  className: 'gap-y-1',
};
