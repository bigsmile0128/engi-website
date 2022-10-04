import { createContext } from 'react';

export type User = {
  accessToken: string;
  walletId: string;
} | null;

const UserContext = createContext({
  user: null,
  setUser: (user: User) => {
    console.info('user set', user);
  },
});

export default UserContext;
