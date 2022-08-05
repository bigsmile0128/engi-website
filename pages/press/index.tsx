import React from 'react';
import classNames from 'classnames';
import Image from 'next/image';

import deskImg from 'public/img/press/desk.jpg';
import BlockQuote from 'components/home/BlockQuote';

interface PressPageProps {
  className?: string;
}

export default function PressPage({ className }: PressPageProps) {
  return (
    <div
      className={classNames(
        'flex flex-col gap-y-12 max-w-page md:!max-w-xl mt-32 mb-32',
        className
      )}
    >
      <h1 className="font-grifter text-6xl">Press Page</h1>
      <section className="mb-8">
        <p className="font-grifter text-lg mb-4">
          Section <span className="text-green-primary">1</span>
        </p>
        <p className="leading-8">
          Engi empowers programmers to flexibly earn money writing code. Work
          whenever, wherever, and however on the jobs that you want. Lorem ipsum
          dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
          incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
          quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
          commodo consequat.
        </p>
      </section>
      <section className="mb-8">
        <p className="font-grifter text-lg mb-4">
          Section <span className="text-green-primary">2</span>
        </p>
        <p className="leading-8">
          Engi empowers programmers to flexibly earn money writing code. Work
          whenever, wherever, and however on the jobs that you want. Lorem ipsum
          dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
          incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
          quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
          commodo consequat.
        </p>
      </section>
      <section className="mb-8">
        <Image src={deskImg} alt="Collaboration" />
      </section>
      <section className="mb-8">
        <p className="font-grifter text-lg mb-4">
          Section <span className="text-green-primary">3</span>
        </p>
        <p className="leading-8">
          Engi empowers programmers to flexibly earn money writing code. Work
          whenever, wherever, and however on the jobs that you want. Lorem ipsum
          dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
          incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
          quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
          commodo consequat.
        </p>
      </section>
      <section className="mb-8">
        <p className="font-grifter text-lg mb-4">
          Section <span className="text-green-primary">4</span>
        </p>
        <p className="leading-8">
          Engi empowers programmers to flexibly earn money writing code. Work
          whenever, wherever, and however on the jobs that you want. Lorem ipsum
          dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
          incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
          quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
          commodo consequat.
        </p>
      </section>
      <section className="mb-8">
        <BlockQuote
          value="We built engi using engi"
          subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam"
        />
      </section>
    </div>
  );
}
