import React from 'react';
import withMock from 'storybook-addon-mock';

import ContactUs from '../../../pages/contact';

export default {
  title: 'Pages/Contact Page',
  component: ContactUs,
  decorators: [withMock],
};

const Template = (args) => <ContactUs {...args} />;

export const Default = Template.bind({});

Default.args = {};

Default.parameters = {
  mockData: [
    {
      url: '/api/contact_us',
      method: 'POST',
      status: 200,
      response: {
        data: {},
      },
    },
  ],
};
