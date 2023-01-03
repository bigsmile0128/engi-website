import { createContext, useContext } from 'react';

export type User = {
  accessToken?: string;
  display: string;
  source: string;
  walletId: string;
} | null;

type UserContextType = {
  setUser: (user: User) => void;
  user: User;
};

const UserContext = createContext<UserContextType>({
  user: null,
  setUser: (user: User) => {
    console.info('user set', user);
  },
});

export const useUser = () => useContext(UserContext);
export default UserContext;
