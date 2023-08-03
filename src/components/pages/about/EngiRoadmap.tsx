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
        <p className="text-lg text-secondary mt-8">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus in
          elit vel mauris tincidunt porta.
        </p>
      </div>
      {/* adjust negative margin-right to compensate for extra width from translation */}
      <div className="mt-8 overflow-x-auto -mr-[370px] tablet:-mr-[400px] scrollbar-horizontal">
        <Roadmap
          className="py-32 tablet:py-40"
          items={[
            {
              date: '2020',
              title: 'Technologies Developed',
              subtitle: 'Academia',
              color: 'green-primary',
            },
            {
              date: '2021',
              title: 'Technologies Developed',
              subtitle: 'Academia',
              color: 'green-primary',
            },
            {
              date: '2022',
              title: 'Technologies Developed',
              subtitle: 'Academia',
              color: 'green-primary',
            },
            {
              date: '2023',
              title: 'Technologies Developed',
              subtitle: 'Academia',
              color: 'orange-primary',
            },
            {
              date: '2024',
              title: 'Technologies Developed',
              subtitle: 'Academia',
              color: 'purple-primary',
            },
            {
              date: '2025',
              title: 'Technologies Developed',
              subtitle: 'Academia',
              color: 'purple-primary',
            },
            {
              date: '2026',
              title: 'Technologies Developed',
              subtitle: 'Academia',
              color: 'purple-primary',
            },
            {
              date: '2024',
              title: 'Technologies Developed',
              subtitle: 'Academia',
              color: 'purple-primary',
            },
            {
              date: '2025',
              title: 'Technologies Developed',
              subtitle: 'Academia',
              color: 'purple-primary',
            },
            {
              date: '2026',
              title: 'Technologies Developed',
              subtitle: 'Academia',
              color: 'purple-primary',
            },
            {
              date: '2027',
              title: 'Technologies Developed',
              subtitle: 'Academia',
              color: 'purple-primary',
            },
          ]}
        />
      </div>
    </div>
  );
}
