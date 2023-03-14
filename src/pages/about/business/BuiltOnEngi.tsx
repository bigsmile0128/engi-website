import React from 'react';
import classNames from 'classnames';
import Avvvatars from 'avvvatars-react';

type BuiltOnEngiProps = {
  className?: string;
};

const testimonials = [
  {
    name: 'Alice',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    name: 'Bob',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    name: 'Charlie',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    name: 'Dairy',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    name: 'Edgar',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    name: 'Felicia',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    name: 'George',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    name: 'Hamilton',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    name: 'Iris',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    name: 'Julia',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    name: 'Kilo',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
];

export default function BuiltOnEngi({ className }: BuiltOnEngiProps) {
  return (
    <div className={classNames('', className)}>
      <p className="font-grifter text-4xl tablet:text-5xl leading-normal tablet:text-center">
        Built on Engi
      </p>
      <p className="mt-8 xl:mt-12 text-secondary text-lg tablet:text-xl tablet:text-center">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </p>
      <div className="mt-12 tablet:mt-16 flex gap-6 -translate-x-80">
        {testimonials.slice(0, 5).map(({ name, description }) => (
          <UserCard
            className="px-6 py-12 basis-80 tablet:pt-32 tablet:basis-[480px]"
            key={name}
            name={name}
            description={description}
          />
        ))}
      </div>
      <div className="mt-8 flex gap-6 -translate-x-56 tablet:-translate-x-[480px]">
        {testimonials.slice(5, 10).map(({ name, description }) => (
          <UserCard
            className="px-6 py-12 basis-80 tablet:pt-32 tablet:basis-[480px]"
            key={name}
            name={name}
            description={description}
          />
        ))}
      </div>
    </div>
  );
}

type UserCardProps = {
  className?: string;
  description: string;
  name: string;
};

function UserCard({ className, name, description }: UserCardProps) {
  return (
    <div
      className={classNames(
        'shrink-0 flex flex-col border border-white/60 bg-[#161B28]/30',
        className
      )}
    >
      <Avvvatars value={name} size={44} />
      <span className="mt-4 font-bold text-xl text-green-primary">{name}</span>
      <span className="mt-4 font-medium text-xl">{description}</span>
    </div>
  );
}
