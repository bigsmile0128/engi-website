import React from 'react';
import classNames from 'classnames';

interface FeaturesProps {
  className?: string;
}

const features = [
  {
    name: 'Open Source',
    description:
      'Bacon ipsum dolor sit amet. Rump chicken pork chop, cupim jerky ground round flank pig meatloaf.',
  },
  {
    name: 'Decentralized',
    description:
      'Cupcake ipsum dolor sit amet. Tootsie roll sesame snaps chocolate bar gummies tiramisu ice cream.',
  },
  {
    name: 'Blockchain',
    description:
      'Cheese ipsum dolor sit amet. Danish fontina blue castello fromage frais.',
  },
];

export default function Features({ className }: FeaturesProps) {
  return (
    <div className={classNames('', className)}>
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="font-grifter text-3xl font-extrabold text-slate-100">
          Built by programmers, for programmers
        </h2>
      </div>
      <dl className="mt-12 space-y-10 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-12 lg:grid-cols-3 lg:gap-x-8">
        {features.map((feature) => (
          <div key={feature.name} className="relative">
            <dt>
              <p className="ml-9 text-lg leading-6 font-medium text-green-600">
                {feature.name}
              </p>
            </dt>
            <dd className="mt-2 ml-9 text-base text-gray-300">
              {feature.description}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
