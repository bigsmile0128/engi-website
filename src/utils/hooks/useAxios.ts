import axios from 'axios';
import { useMemo } from 'react';
import { useUser } from '../contexts/userContext';

export default function useAxios() {
  const { user } = useUser();
  return useMemo(() => {
    if (user?.accessToken) {
      return axios.create({
        headers: { Authorization: `Bearer ${user.accessToken}` },
      });
    } else {
      return axios.create();
    }
  }, [user?.accessToken]);
}
