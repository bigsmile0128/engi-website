import { createContext, useContext } from 'react';

export type User = {
  accessToken?: string;
  display: string;
  source: string;
  walletId: string;
} | null;

const UserContext = createContext({
  user: null,
  setUser: (user: User) => {
    console.info('user set', user);
  },
});

export const useUser = () => useContext(UserContext);
export default UserContext;
