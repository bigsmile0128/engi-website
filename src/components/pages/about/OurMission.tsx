import React from 'react';
import classNames from 'classnames';
import ChevronRight from '~/components/ChevronRight';

type OurMissionProps = {
  className?: string;
};

export default function OurMission({ className }: OurMissionProps) {
  return (
    <div className={classNames('bg-about-mission', className)}>
      <div className="max-w-page w-full flex flex-col items-center text-center py-32">
        <h2 className="font-grifter text-4xl sm:text-8xl mb-4 flex items-center whitespace-pre">
          <ChevronRight className="text-green-primary h-6 w-6 sm:h-16 sm:w-16 inline-block mr-1" />
          <span className="-mb-3 sm:-mb-6">
            Our <span className="text-green-primary">Mission</span>
          </span>
        </h2>
        <p className="sm:mt-6 text-lg sm:text-2xl text-secondary max-w-lg">
          Engi deletes applications, interviews, bosses, time zones, borders,
          language barriers, and “culture fit” from professional software
          engineering engagements.
        </p>
      </div>
    </div>
  );
}
