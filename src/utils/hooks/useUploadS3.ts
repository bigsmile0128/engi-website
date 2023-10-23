import { useMutation } from 'react-query';
import useAxios from './useAxios';

export default function useUploadS3() {
  const axios = useAxios();
  return useMutation<string, any, any>(['uploadS3'], async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    const { data } = await axios.put('/api/s3', formData);
    return data.url;
  });
}
