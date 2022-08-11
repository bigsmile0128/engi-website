import React from 'react';
import classNames from 'classnames';
import { Job } from 'types';
import Tag from 'components/Tag';
import dayjs from 'dayjs';
import { SiPython } from '@react-icons/all-files/si/SiPython';

type JobDescriptionProps = {
  className?: string;
  isLoading?: boolean;
  job?: Job;
};

export default function JobDescription({
  className,
  isLoading,
  job,
}: JobDescriptionProps) {
  return (
    <div className={classNames('flex flex-col items-start', className)}>
      <p className={classNames('', isLoading ? 'skeleton' : 'text-secondary')}>
        {`Posted ${dayjs(job?.created).fromNow()}`}
      </p>
      <h2 className="mt-8 font-grifter text-xl">Languages required</h2>
      <p className="mt-4 flex-flex-wrap gap-4">
        <Tag>
          <SiPython className="text-orange-primary mr-2" /> Python
        </Tag>
      </p>
      <div className="mt-8 w-full border-t border-white/30" />
    </div>
  );
}
