import React from 'react';

import BuyEngi from '../wallet/BuyEngi';

export default {
  title: 'BuyEngi',
  component: BuyEngi,
};

const Template = (args) => <BuyEngi {...args} />;

export const Default = Template.bind({});
Default.args = {};
