import React from 'react';
import classNames from 'classnames';
import ChevronRight from '~/components/ChevronRight';
import Content from '~/content/about.json';

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
      <h1 className="font-grifter text-5xl lg:text-6xl !leading-tight">
        <ChevronRight className="inline mr-2 h-6 w-6 tablet:h-8 tablet:w-8 xl:h-10 xl:w-10" />
        {Content.HEADER.TITLE[1]}
        <span className="text-green-primary">
          {Content.HEADER.TITLE['2_HIGHLIGHTED']}
        </span>
        {Content.HEADER.TITLE[3]}
      </h1>
      <p className="mt-8 text-xl text-secondary tablet:max-w-xl desktop:max-w-2xl leading-relaxed">
        {Content.HEADER.SUBTITLE}
      </p>
    </div>
  );
}
