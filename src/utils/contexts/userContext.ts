import { createContext } from 'react';

export type User = {
  walletId: string;
  accessToken: string;
} | null;

const UserContext = createContext({
  user: null,
  setUser: (user: User) => {},
});

export default UserContext;
