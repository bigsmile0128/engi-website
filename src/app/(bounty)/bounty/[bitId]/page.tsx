import axios from 'axios';
import { gql } from 'graphql-request';
import BitDetailsContainer from './container';

type Props = {
  params: {
    bitId: string;
  };
};

export async function generateMetadata({ params }: Props) {
  let title;
  let description;
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/api/graphql`,
      {
        query: gql`
          query BitDetails($bitId: UInt64!) {
            job(id: $bitId) {
              job {
                name
                funding
                technologies
              }
            }
          }
        `,
        variables: {
          bitId: params.bitId,
        },
      }
    );
    const job = response.data?.data?.job?.job ?? {};
    title = `Bounty | ${job?.name}` ?? 'Bounty';
    const technologies = job?.technologies ?? [];
    description =
      technologies.length > 0
        ? `This bounty uses ${technologies.join(', ')}.`
        : 'Solve this bounty to win engi.';
  } catch (e: any) {
    title = 'Bounty';
    description = 'Solve this bounty to win engi.';
  }

  return {
    openGraph: {
      title,
      description,
      siteName: 'engi',
      type: 'website',
    },
  };
}

export default function BitDetails({ params }: Props) {
  const { bitId } = params;

  return <BitDetailsContainer bitId={bitId} />;
}
