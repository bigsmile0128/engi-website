import React from 'react';

import SearchInput from '../SearchInput';

export default {
  title: 'SearchInput',
  component: SearchInput,
};

const Template = (args) => <SearchInput {...args} />;

export const Default = Template.bind({});
Default.args = {
  className: 'w-64',
  isLoading: false,
  placeholder: 'Search bits',
};
