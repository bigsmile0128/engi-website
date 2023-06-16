import React from 'react';
import Stats from './page';

export default {
  title: 'EngineerStats',
  component: Stats,
};

const Template = (args) => <Stats {...args} />;

export const Default = Template.bind({});
Default.args = {
  params: {
    accountId: '12345',
  },
};
