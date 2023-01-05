import { GrStatusDisabledSmall } from '@react-icons/all-files/gr/GrStatusDisabledSmall';
import { GrStatusGoodSmall } from '@react-icons/all-files/gr/GrStatusGoodSmall';
import * as Sentry from '@sentry/react';
import axios from 'axios';
import classNames from 'classnames';
import { gql } from 'graphql-request';
import pluralize from 'pluralize';
import { useQuery } from 'react-query';
import Tooltip from '~/components/Tooltip';

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
        <Tooltip title={<span>Establishing Network Connection...</span>}>
          <span>
            <GrStatusGoodSmall className="text-sm text-blue-400 animate-pulse" />
          </span>
        </Tooltip>
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
        <Tooltip title="Engi Appears Offline">
          <span>
            <GrStatusDisabledSmall className="text-sm text-red-400" />
          </span>
        </Tooltip>
      )}
      {!isLoading && !data?.status && (
        <Tooltip title="Network Status Unknown">
          <span>
            <GrStatusGoodSmall className="text-sm text-secondary" />
          </span>
        </Tooltip>
      )}
    </div>
  );
}
