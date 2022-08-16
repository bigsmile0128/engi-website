import React from 'react';
import { AiFillCreditCard } from 'react-icons/ai';

import Statistic from '../Statistic';

export default {
  title: 'Statistic',
  component: Statistic,
};

const Template = (args) => <Statistic {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  icon: <AiFillCreditCard className="text-orange-primary h-5 w-5" />,
  value: 'e100',
  title: 'Funding',
};
