import React from 'react';

import TechnologyTag from '../TechnologyTag';

export default {
  title: 'LanguageTag',
  component: TechnologyTag,
};

const Template = (args) => <TechnologyTag {...args}>React</TechnologyTag>;

export const Default = Template.bind({});
Default.args = {
  className: 'text-white',
  value: 'PYTHON',
};
