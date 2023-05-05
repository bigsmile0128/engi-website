import React from 'react';
import classNames from 'classnames';
import { RiBuilding2Fill, RiEarthFill, RiGroupFill } from 'react-icons/ri';

type TypesOfProjectsProps = {
  className?: string;
};

const projectTypes = [
  {
    className: '',
    title: 'Test-Driven Smart Contracts',
    description:
      'Better prepare your Solidity contracts for audits developing TDD while saving on implementation costs',
    icon: <RiBuilding2Fill className="h-10 w-10 text-purple-primary" />,
  },
  {
    className: '',
    title: 'Web User Interfaces',
    description:
      'Provide design files, screen sizes, and variants to receive pixel-perfect CSS for your UI components',
    icon: <RiGroupFill className="h-10 w-10 text-green-primary" />,
  },
  {
    className: 'tablet:hidden desktop:flex',
    title: 'Libraries & SDKs',
    description:
      'Business logic validated by tests, benchmarks, and linters unlocks crowd-sourced development for nearly any software project',
    icon: <RiEarthFill className="h-10 w-10 text-orange-primary" />,
  },
];

export default function TypesOfProjects({ className }: TypesOfProjectsProps) {
  return (
    <div className={classNames('', className)}>
      <p className="font-grifter text-4xl tablet:text-5xl leading-normal">
        Who can use Engi?
      </p>
      <p className="mt-8 xl:mt-12 text-secondary text-lg tablet:text-xl xl:max-w-lg">
        Whether you&apos;re test-driven or looking to increase test coverage,
        automatically measurable progress is all that&apos;s needed to leverage
        Engi
      </p>
      <div className="mt-16 w-full grid gap-24 tablet:grid-cols-2 desktop:grid-cols-3">
        {projectTypes.map(({ className, title, description, icon }) => (
          <div
            key={title}
            className={classNames(
              'flex flex-col items-center text-center',
              className
            )}
          >
            <div className="border border-white/60 h-20 w-20 flex items-center justify-center bg-[#161B28]/30">
              {icon}
            </div>
            <p className="mt-12 font-bold text-xl text-green-primary">
              {title}
            </p>
            <p className="mt-8 font-medium text-xl">{description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
