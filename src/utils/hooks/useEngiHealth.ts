import { useQuery } from 'react-query';
import * as Sentry from '@sentry/react';
import { gql } from 'graphql-request';
import axios from 'axios';

type EngiHealth = {
  chain: string;
  nodeName: string;
  peerCount: number;
  status: string;
  version: string;
};

export default function useEngiHealth() {
  return useQuery<EngiHealth>(
    ['blockchainHealth'],
    async () => {
      const response = await axios.post('/api/graphql', {
        query: gql`
          query EngiHealthStatusQuery {
            health {
              chain
              nodeName
              version
              status
              peerCount
            }
          }
        `,
      });
      const health = response.data?.data?.health;
      return health;
    },
    {
      retry: false,
      onError: Sentry.captureException,
    }
  );
}
