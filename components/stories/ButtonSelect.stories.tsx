import React from 'react';

import ButtonSelect from '../ButtonSelect';

export default {
  title: 'ButtonSelect',
  component: ButtonSelect,
};

const Template = (args) => <ButtonSelect {...args} />;

export const Default = Template.bind({});

const options = [
  {
    label: 'Option 1',
    value: 1,
  },
  {
    label: 'Option 2',
    value: 2,
  },
];

Default.args = {
  className: '',
  options,
  value: options[0].value,
  onChange: (value) => {},
  disabled: false,
};
