import React from 'react';
import classNames from 'classnames';
import AppleSvg from 'public/img/about/companies/apple.svg';
import KernelSvg from 'public/img/about/companies/kernel.svg';
import { BiBuildings } from 'react-icons/bi';

type CompanyIconProps = {
  className?: string;
  name?: string;
};

export default function CompanyIcon({ className, name }: CompanyIconProps) {
  switch (name) {
    case 'Kernel':
      return <KernelSvg className={className} />;
    case 'Apple':
      return <AppleSvg className={className} />;
    default:
      return <BiBuildings className={className} />;
  }
}
