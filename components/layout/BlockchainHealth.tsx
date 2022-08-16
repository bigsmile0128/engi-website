import React from 'react';
import classNames from 'classnames';
import { useQuery } from 'react-query';
import { request, gql } from 'graphql-request';
import pluralize from 'pluralize';
import { GrStatusDisabledSmall } from '@react-icons/all-files/gr/GrStatusDisabledSmall';
import { GrStatusGoodSmall } from '@react-icons/all-files/gr/GrStatusGoodSmall';
import * as Sentry from '@sentry/react';

type BlockchainHealthProps = {
  className?: string;
  isStacked?: boolean;
  showPeerCount?: boolean;
};

export default function BlockchainHealth({
  className,
  isStacked,
  showPeerCount = true,
}: BlockchainHealthProps) {
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
      onError: Sentry.captureException,
    }
  );

  return isStacked ? (
    <div className={classNames('flex gap-x-8', className)}>
      {showPeerCount && data?.status === 'ONLINE' && (
        <div className="flex flex-col items-center">
          <span
            className={classNames('font-grifter', {
              'text-gray-400': data?.peerCount === undefined,
            })}
          >
            {data?.peerCount ?? 'N/A'}
          </span>
          <span className="font-medium text-secondary leading-5">
            {pluralize('peer', data?.peerCount ?? 0)}
          </span>
        </div>
      )}
      {isLoading && (
        <div className="flex flex-col items-center">
          <GrStatusGoodSmall className="mt-[1px] mb-1 text-secondary" />
          <span className="font-medium text-secondary leading-5">
            connecting
          </span>
        </div>
      )}
      {data?.status === 'ONLINE' && (
        <div className="flex flex-col items-center justify-between">
          <GrStatusGoodSmall className="mt-[1px] mb-1 text-green-primary" />
          <span className="font-medium text-secondary leading-5">online</span>
        </div>
      )}
      {data?.status === 'OFFLINE' && (
        <div className="flex flex-col items-center">
          <GrStatusDisabledSmall className="mt-[1px] mb-1 text-red-400" />
          <span className="font-medium text-secondary leading-5">offline</span>
        </div>
      )}
      {!isLoading && !data?.status && (
        <div className="flex flex-col items-center">
          <GrStatusGoodSmall className="mt-[1px] mb-1 text-secondary" />
          <span className="font-medium text-secondary leading-5">
            status unknown
          </span>
        </div>
      )}
    </div>
  ) : (
    <div className={classNames('flex items-center gap-x-3', className)}>
      {isLoading && (
        <>
          <GrStatusGoodSmall className="text-sm text-secondary" />
          <span>connecting...</span>
        </>
      )}
      {data?.status === 'ONLINE' && (
        <>
          <GrStatusGoodSmall className="text-sm text-green-primary" />
          <span>
            {showPeerCount && data?.peerCount !== undefined ? (
              <span>
                <span className="font-bold">{data?.peerCount}</span> online{' '}
                {pluralize('peer', data?.peerCount ?? 0)}
              </span>
            ) : (
              <span>online</span>
            )}
          </span>
        </>
      )}
      {data?.status === 'OFFLINE' && (
        <>
          <GrStatusDisabledSmall className="text-sm text-red-400" />
          <span>offline</span>
        </>
      )}
      {!isLoading && !data?.status && (
        <>
          <GrStatusGoodSmall className="text-sm text-secondary" />
          <span>status unknown</span>
        </>
      )}
    </div>
  );
}
