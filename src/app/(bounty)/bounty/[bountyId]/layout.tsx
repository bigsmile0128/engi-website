import axios from 'axios';
import classNames from 'classnames';
import { gql } from 'graphql-request';
import React from 'react';
import Header from './Header';
import { getBountyDetails } from './api';
import GetStarted from './GetStarted';
import BitActivity from './BitActivity';
import BountyTabs from './BountyTabs';

type Props = {
  params: {
    bountyId: string;
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
          query BountyDetails($bountyId: UInt64!) {
            job(id: $bountyId) {
              job {
                name
                funding
                technologies
              }
            }
          }
        `,
        variables: {
          bountyId: params.bountyId,
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

export default async function BountyDetailsLayout({
  children,
  params,
}: {
  children: React.ReactNode;
} & Props) {
  const { bountyId } = params;
  // fetch to see if valid bounty
  const bounty = await getBountyDetails(bountyId);
  // TODO: handle error page
  return (
    <div className="relative mt-4 tablet:mt-12 mb-24">
      <Header data={bounty} />
      <div className="max-w-page flex flex-col desktop:flex-row mt-8 tablet:mt-8">
        <div className="flex-1">
          <BountyTabs bountyId={bountyId} className="mb-8" />
          {children}
        </div>
        <BitActivity
          bitId={bountyId}
          className="hidden self-start lg:flex lg:basis-[400px] xl:basis-[430px] shrink-0 ml-16"
          data={bounty}
        />
      </div>
      {/* TABLET "Get Started" fixed section on bottom */}
      <GetStarted
        className={classNames(
          'fixed bottom-0 w-full z-50 px-0',
          'hidden tablet:block desktop:hidden'
        )}
        bitId={bountyId}
      />
    </div>
  );
}
