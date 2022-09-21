import React from 'react';

import Markdown from '../Markdown';
import { mockDescription } from 'mockServer/mockData';

export default {
  title: 'Markdown',
  component: Markdown,
};

const Template = (args) => <Markdown {...args}>{mockDescription}</Markdown>;

export const Default = Template.bind({});
Default.args = {};
