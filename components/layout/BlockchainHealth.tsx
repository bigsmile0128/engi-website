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
    <div className={classNames('flex items-center gap-x-12', className)}>
      {/* TODO: display after API is updated */}
      <div className="flex flex-col items-center">
        <span
          className={classNames(
            'font-grifter whitespace-pre',
            isError ? 'text-gray-400' : ''
          )}
        >
          {isLoading ? ' ' : data?.peers ?? 'N/A'}
        </span>
        <span className="font-medium text-gray-300">peers</span>
      </div>
      <div className="flex flex-col items-center">
        <span
          className={classNames(
            'font-grifter whitespace-pre',
            isError ? 'text-gray-400' : ''
          )}
        >
          {isLoading ? ' ' : data?.peers ?? 'N/A'}
        </span>
        <span className="font-medium text-gray-300">head</span>
      </div>
      <div className="flex flex-col items-center">
        <span className={classNames('font-grifter h-6')}>
          {isLoading && <GrStatusWarningSmall className="text-yellow-400" />}
          {data?.status === 'ONLINE' && (
            <GrStatusGoodSmall className="text-emerald-300" />
          )}
          {data?.status === 'OFFLINE' && (
            <GrStatusDisabledSmall className="text-red-400" />
          )}
          {!isLoading && !data?.status && (
            <MdSignalWifiStatusbarNotConnected className="text-red-400" />
          )}
        </span>
        <span className="font-medium text-gray-300">
          {isLoading ? 'connecting...' : data?.status ?? 'unknown'}
        </span>
      </div>
    </div>
  );
}
