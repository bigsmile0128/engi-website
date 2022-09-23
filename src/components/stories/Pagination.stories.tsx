import React from 'react';

import Pagination from '../global/Pagination/Pagination';

export default {
  title: 'Pagination',
  component: Pagination,
};

const Template = (args) => <Pagination {...args} />;

export const Default = Template.bind({});
Default.args = {
  pageCount: 10,
  forcePage: 3,
};
