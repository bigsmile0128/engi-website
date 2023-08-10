import React from 'react';
import classNames from 'classnames';
import Roadmap from '~/app/(marketing)/about/Roadmap';

type EngiRoadmapProps = {
  className?: string;
};

export default function EngiRoadmap({ className }: EngiRoadmapProps) {
  return (
    <div className={classNames('', className)}>
      <div className="max-w-page text-center">
        <h2 className="font-grifter text-4xl sm:text-5xl">Engi Roadmap</h2>
        <p className="text-lg mt-8 font-light">
          a chronology in service of the future of work
        </p>
      </div>
      {/* adjust negative margin-right to compensate for extra width from translation */}
      <div
        className="mt-8 overflow-x-auto -mr-[370px] tablet:-mr-[400px] scrollbar-horizontal"
        style={{ width: '100vw' }}
      >
        <Roadmap
          className="py-32 tablet:py-40"
          items={[
            {
              date: '2021',
              title: 'Initial Commit',
              subtitle: 'Alpha',
              color: 'green-primary',
            },
            {
              date: '2022',
              title: 'Demonstrate Prototype',
              subtitle: 'Alpha',
              color: 'green-primary',
            },
            {
              date: '2022',
              title: 'Fundraise I',
              subtitle: 'Alpha',
              color: 'green-primary',
            },
            {
              date: '2022',
              title: 'Establish Founding Team',
              subtitle: 'Alpha',
              color: 'green-primary',
            },
            {
              date: '2023',
              title: 'Launch Contactless Engineering Testnet',
              subtitle: 'Beta',
              color: 'green-primary',
              milestone: true,
            },
            {
              date: '2023',
              title: 'Open-Source Ecosystem',
              subtitle: 'Beta',
              color: 'green-primary',
            },
            {
              date: '2023',
              title: 'Support Closed-Source Bounties via AI',
              subtitle: 'Beta',
              color: 'orange-primary',
            },
            {
              date: '2023',
              title: 'Launch Kusama Parachain & DAO',
              subtitle: 'Beta',
              color: 'orange-primary',
              milestone: true,
            },
            {
              date: '2023',
              title: 'Fundraise II',
              subtitle: 'Beta',
              color: 'orange-primary',
            },
            {
              date: '2024',
              title: 'Zero-Knowledge Bounty Verification',
              subtitle: 'Omega',
              color: 'purple-primary',
            },
            {
              date: '2024',
              title: 'Proof of Engineering Consensus',
              subtitle: 'Omega',
              color: 'purple-primary',
            },
            {
              date: '2024',
              title: 'ICO & Launch Public Mainnet on Polkadot',
              subtitle: 'Omega',
              color: 'purple-primary',
              milestone: true,
            },
            {
              date: '2024',
              title: 'Fund Grants for Trustless Labor Projects',
              subtitle: 'Omega',
              color: 'purple-primary',
            },
            {
              date: '2025',
              title: 'Graduate First Engi Center Cohort',
              subtitle: 'Zeta',
              color: 'purple-primary',
            },
            {
              date: '2025',
              title: 'Support All Forms of Engineering Labor',
              subtitle: 'Zeta',
              color: 'purple-primary',
            },
            {
              date: '2026',
              title: 'Support All Forms of Verifiable Labor',
              subtitle: 'Zeta',
              color: 'purple-primary',
            },
            {
              date: '2026+',
              title: '👈 And thats not the half of it...',
              subtitle: 'Zeta',
              color: 'purple-primary',
            },
          ]}
        />
      </div>
    </div>
  );
}
