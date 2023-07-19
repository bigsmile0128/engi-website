import React from 'react';
import classNames from 'classnames';
import { BitStatus as BitStatusType } from '~/types';
import {
  RiCheckboxCircleLine,
  RiFlashlightFill,
  RiRocket2Fill,
} from 'react-icons/ri';

type BitStatusProps = {
  className?: string;
  isLoading?: boolean;
  status?: BitStatusType;
};

export default function BitStatus({
  className,
  status,
  isLoading,
}: BitStatusProps) {
  let icon;
  let text;
  if (status === BitStatusType.ACTIVE) {
    icon = <RiFlashlightFill className="text-lg text-orange-primary" />;
    text = 'Work Started';
  } else if (status == BitStatusType.COMPLETE) {
    icon = <RiCheckboxCircleLine className="text-lg text-green-primary" />;
    text = 'Work Done';
  } else {
    icon = <RiRocket2Fill className="text-lg" />;
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
      <span className="truncate">{text}</span>
    </div>
  );
}
