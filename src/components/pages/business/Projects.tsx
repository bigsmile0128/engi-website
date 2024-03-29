import React from 'react';
import classNames from 'classnames';
import ProjectsCarousel from './ProjectsCarousel';

type ProjectsProps = {
  className?: string;
};

export default function Projects({ className }: ProjectsProps) {
  return (
    <div className={classNames('', className)}>
      <p className="max-w-page w-full font-grifter text-4xl tablet:text-5xl">
        Ship faster at scale with{' '}
        <span className="text-green-primary">Engi</span>
      </p>
      <ProjectsCarousel className="mt-8" />
    </div>
  );
}
