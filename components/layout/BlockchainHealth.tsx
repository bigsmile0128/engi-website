import React from 'react';
import classNames from 'classnames';
import { useQuery } from 'react-query';
import { request, gql } from 'graphql-request';
import { BiHealth } from 'react-icons/bi';
import { MdSignalWifiStatusbarNotConnected } from 'react-icons/md';
import {
  GrStatusDisabledSmall,
  GrStatusGoodSmall,
  GrStatusWarningSmall,
  GrStatusWarning,
} from 'react-icons/gr';

type BlockchainHealthProps = {
  className?: string;
};

export default function BlockchainHealth({ className }: BlockchainHealthProps) {
  const { isLoading, isError, data } = useQuery(
    ['blockchainHealth'],
    async () => {
      const { health } = await request(
        '/api/graphql',
        gql`
          query EngiHealthStatusQuery {
            health {
              chain
              nodeName
              version
              status
              peerCount
            }
          }
        `
      );
      return health;
    },
    {
      retry: false,
    }
  );

  return (
    <div className={classNames('flex items-center gap-x-3', className)}>
      {isLoading && (
        <>
          <GrStatusGoodSmall className="text-gray-300" />
          <span>connecting...</span>
        </>
      )}
      {data?.status === 'ONLINE' && (
        <>
          <GrStatusGoodSmall className="text-emerald-300" />
          <span>
            <span className="font-bold">{data?.peerCount}</span> online peers
          </span>
        </>
      )}
      {data?.status === 'OFFLINE' && (
        <>
          <GrStatusDisabledSmall className="text-red-400" />
          <span>offline</span>
        </>
      )}
      {!isLoading && !data?.status && (
        <>
          <GrStatusGoodSmall className="text-gray-300" />
          <span>status unknown</span>
        </>
      )}
    </div>
  );
}
