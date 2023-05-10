import React from 'react';
import classNames from 'classnames';
import Image from 'next/image';
import whoWeAreImg from 'public/img/about/who-we-are.png';
import Content from '~/content/about.json';

type WhoWeAreProps = {
  className?: string;
};

export default function WhoWeAre({ className }: WhoWeAreProps) {
  return (
    <div
      className={classNames(
        'flex gap-16 flex-col-reverse sm:flex-row items-center',
        className
      )}
    >
      <Image className="flex-1 max-w-50" src={whoWeAreImg} alt="who-we-are" />
      <div className="flex-1 flex flex-col">
        <span className="font-grifter text-5xl">
          {Content.SPLIT_SEGMENT.TITLE}
        </span>
        <span className="mt-8 text-xl text-secondary">
          {Content.SPLIT_SEGMENT.BODY[1]}
          <span className="underline decoration-green-primary black text-white">
            {Content.SPLIT_SEGMENT.BODY['2_HIGHLIGHTED']}
          </span>
        </span>
      </div>
    </div>
  );
}
