import React from 'react';
import classNames from 'classnames';
import Image from 'next/image';
import whoWeAreImg from 'public/img/about/who-we-are.png';

type WhoWeAreProps = {
  className?: string;
};

export default function WhoWeAre({ className }: WhoWeAreProps) {
  return (
    <div
      className={classNames(
        'flex gap-16 flex-col-reverse sm:flex-row',
        className
      )}
    >
      <Image className="flex-1" src={whoWeAreImg} alt="who-we-are" />
      <div className="flex-1 flex flex-col">
        <span className="font-grifter text-5xl">Who we are</span>
        <span className="mt-8 text-xl text-secondary">
          To unlock human innovation and end global poverty through
          always-available and accessible engineering work and to accelerate the
          future of accessible, flexible and equitable software engineering work
          for coders everywhere.
        </span>
      </div>
    </div>
  );
}
