import React from 'react';

import SearchInput from '../SearchInput';

export default {
  title: 'SearchInput',
  component: SearchInput,
};

const Template = (args) => <SearchInput {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  className: 'w-64',
  isLoading: false,
  placeholder: 'Search jobs',
};
