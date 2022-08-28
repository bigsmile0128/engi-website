import React from 'react';

import Pagination from '../Pagination';

export default {
  title: 'Pagination',
  component: Pagination,
};

const Template = (args) => <Pagination {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  pageCount: 10,
  forcePage: 3,
};
