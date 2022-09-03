import React from 'react';
import classNames from 'classnames';
import { JobStatus as JobStatusType } from 'types';
import {
  RiCheckboxCircleLine,
  RiFlashlightFill,
  RiRocket2Fill,
} from 'react-icons/ri';

type JobStatusProps = {
  className?: string;
  isLoading?: boolean;
  status?: JobStatusType;
};

export default function JobStatus({
  className,
  status,
  isLoading,
}: JobStatusProps) {
  let icon;
  let text;
  if (status === JobStatusType.ACTIVE) {
    icon = <RiFlashlightFill className="text-orange-primary" />;
    text = 'Work Started';
  } else if (status == JobStatusType.COMPLETE) {
    icon = <RiCheckboxCircleLine className="text-green-primary" />;
    text = 'Work Done';
  } else {
    icon = <RiRocket2Fill />;
    text = 'Ready to Work';
  }
  return (
    <div
      className={classNames(
        'flex items-center gap-x-1',
        isLoading ? 'children:skeleton' : '',
        className
      )}
    >
      {icon}
      <span className="whitespace-nowrap">{text}</span>
    </div>
  );
}
