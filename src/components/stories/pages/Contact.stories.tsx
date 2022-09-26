import React from 'react';
import cn from 'classnames';
import withMock from 'storybook-addon-mock';
import styles from './common_bg.module.css';
import ContactUs from '../../../pages/contact';

export default {
  title: 'Pages/Contact Page',
  component: ContactUs,
  decorators: [withMock],
  parameters: {
    screenshot: {
      delay: 2000,
    },
  },
};

const Template = (args) => (
  <div className={cn('py-20', styles.main_bg)}>
    <ContactUs {...args} />
  </div>
);

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
