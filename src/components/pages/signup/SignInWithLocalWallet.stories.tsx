import React from 'react';

import SignInWithLocalWallets from '~/components/pages/signup/SignInWithLocalWallets';

export default {
  title: 'SignInWithLocalWallets',
  component: SignInWithLocalWallets,
};

const Template = (args) => <SignInWithLocalWallets {...args} />;

export const LocalWalletsFound = Template.bind({});
LocalWalletsFound.storyName = 'Local Wallets Found';
LocalWalletsFound.args = {};
