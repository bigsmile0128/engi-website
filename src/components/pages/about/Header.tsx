import React from 'react';
import classNames from 'classnames';

type HeaderProps = {
  className?: string;
};

export default function Header({ className }: HeaderProps) {
  return (
    <div
      className={classNames(
        'text-left sm:text-center flex flex-col items-center',
        className
      )}
    >
      <h1 className="font-grifter text-4xl sm:text-5xl !leading-tight">
        Accelerating the <span className="text-green-primary">future</span> of
        software engineering
      </h1>
      <p className="mt-8 text-xl text-secondary max-w-xl leading-relaxed">
        We are a marketplace for custom software. Engineers come for
        flexibility, accessibility, and growth. Work whenever, wherever, and
        however on the jobs that you want. Businesses come for new access to
        programmers across the world.
      </p>
    </div>
  );
}
