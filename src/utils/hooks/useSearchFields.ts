import { useQuery } from 'react-query';
import * as Sentry from '@sentry/react';
import { gql } from 'graphql-request';
import axios from 'axios';
import { BitStatus, DateOption } from '~/types';

const TechnologyMap = {
  C: 'C',
  C_SHARP: 'C#',
  CPP: 'C++',
  CSS: 'CSS',
  DOCKER: 'Docker',
  INK: 'Ink',
  JAVA_SCRIPT: 'JavaScript',
  PYTHON: 'Python',
  RUST: 'Rust',
  SAME_STORY: 'Same Story',
  SOLANG: 'Solang',
  SOLIDITY: 'Solidity',
  SUBSTRATE: 'Substrate',
  TYPE_SCRIPT: 'TypeScript',
};

export default function useSearchFields() {
  return useQuery<any>(
    ['searchFields'],
    async () => {
      const response = await axios.post('/api/graphql', {
        query: gql`
          query SearchFields {
            jobs {
              static {
                technologies
              }
              facets {
                createdOnPeriod {
                  name
                  values {
                    range
                    count
                    value
                  }
                }
                organizations {
                  name
                  values {
                    range
                    count
                  }
                }
              }
            }
          }
        `,
      });
      const data = response.data?.data?.jobs ?? {};
      const facets = data?.facets ?? {};

      const labelSort = (a, b) => a.label.localeCompare(b.label);

      return {
        technologies: (data.static?.technologies ?? [])
          .map((technology) => ({
            label: TechnologyMap[technology] ?? technology,
            value: technology,
          }))
          .sort(labelSort),
        organizations: (facets.organizations?.value ?? [])
          .map((organization) => ({
            label: organization.range,
            value: organization.range,
          }))
          .sort(labelSort),
        createdAfter: [
          { label: 'Last day', value: DateOption.LAST_DAY },
          { label: 'Last week', value: DateOption.LAST_WEEK },
          { label: 'Last month', value: DateOption.LAST_MONTH },
          { label: 'Last quarter', value: DateOption.LAST_QUARTER },
          { label: 'Last year', value: DateOption.LAST_YEAR },
        ],
        status: [
          { label: 'Open', value: BitStatus.OPEN },
          { label: 'Active', value: BitStatus.ACTIVE },
          { label: 'Completed', value: BitStatus.COMPLETE },
        ],
      };
    },
    {
      retry: false,
      onError: Sentry.captureException,
    }
  );
}
