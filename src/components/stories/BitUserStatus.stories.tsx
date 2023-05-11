import BitUserStatus from '../BitUserStatus';

export default {
  title: 'BitUserStatus',
  component: BitUserStatus,
};

const Template = (args) => <BitUserStatus {...args} />;

export const Default = Template.bind({});

Default.args = {
  className: '',
  status: 'OPEN',
};
