import React from 'react';

import LanguageTag from '../LanguageTag';

export default {
  title: 'LanguageTag',
  component: LanguageTag,
};

const Template = (args) => <LanguageTag {...args}>React</LanguageTag>;

export const Default = Template.bind({});
Default.args = {
  className: 'text-white',
  value: 'PYTHON',
};
