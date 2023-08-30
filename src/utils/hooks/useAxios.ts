import axios from 'axios';
import { useMemo } from 'react';

export default function useAxios() {
  return useMemo(() => {
    return axios.create();
  }, []);
}
