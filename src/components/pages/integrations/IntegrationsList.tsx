'use client';

import classNames from 'classnames';
import { useState } from 'react';
import {
  RiBuilding2Fill,
  RiEarthFill,
  RiGithubFill,
  RiGroupFill,
} from 'react-icons/ri';
import {
  SiCsharp,
  SiEthereum,
  SiFigma,
  SiPolkadot,
  SiPython,
  SiReact,
  SiRust,
  SiTypescript,
} from 'react-icons/si';

type IntegrationsListProps = {
  className?: string;
};

enum Category {
  'APIs' = 'APIs',
  'UIs' = 'UIs',
  'Web3' = 'Web3',
}

const CATEGORIES = [
  {
    icon: <RiBuilding2Fill />,
    label: 'APIs',
    value: Category.APIs,
  },
  {
    icon: <RiGroupFill />,
    label: 'Web3',
    value: Category.Web3,
  },
  {
    icon: <RiEarthFill />,
    label: 'UIs',
    value: Category.UIs,
  },
];

const INTEGRATIONS = [
  {
    icon: <RiGithubFill className="h-16 w-auto" />,
    title: 'Github',
    description: 'Authorize Engi to open pull requests with verified code',
    categories: [Category.APIs, Category.UIs, Category.Web3],
  },
  {
    icon: <SiPolkadot className="h-16 w-auto" />,
    title: 'Substrate & ink!',
    description: 'Build Substrate Layer-1s or dApps the Engi Way',
    categories: [Category.Web3],
  },
  {
    icon: <SiEthereum className="h-16 w-auto" />,
    title: 'Ethereum & Solidity',
    description: 'Quickly build or maintain any Ethereum dApp',
    categories: [Category.Web3],
  },
  {
    icon: <SiFigma className="h-16 w-auto" />,
    title: 'Figma',
    description: 'Use our Figma Plugin to generate UI bounty specs',
    categories: [Category.UIs],
  },
  {
    icon: <SiCsharp className="h-16 w-auto" />,
    title: 'C#',
    description: 'Develop your dotnet API',
    categories: [Category.APIs],
  },
  {
    icon: <SiRust className="h-16 w-auto" />,
    title: 'Rust',
    description: 'Use cargo tests to drive your product foward',
    categories: [Category.APIs],
  },
  {
    icon: <SiPython className="h-16 w-auto" />,
    title: 'Python',
    description: 'Develop python libraries testing with pytest',
    categories: [Category.APIs],
  },
  {
    icon: <SiReact className="h-16 w-auto" />,
    title: 'React',
    description:
      'Use our custom Jest test matcher to utilize your designs to get custom CSS from the network',
    categories: [Category.UIs],
  },
  {
    icon: <SiTypescript className="h-16 w-auto" />,
    title: 'Javascript & TypeScript',
    description:
      'Use Engi to implement application business logic, ship node APIs, and more',
    categories: [Category.UIs, Category.APIs],
  },
];

export default function IntegrationsList({ className }: IntegrationsListProps) {
  const [category, setCategory] = useState<Category | null>(null);
  return (
    <div className={classNames('', className)}>
      <div
        className={classNames(
          'max-w-page pr-0 flex items-center gap-4 overflow-x-auto scrollbar-horizontal'
        )}
        style={{
          // fade out mask to right side to indicate more scrolling
          // include vendor prefix for using mask-image inline
          WebkitMaskImage:
            'linear-gradient(to right, rgba(0, 0, 0, 1) 85%, rgba(0, 0, 0, 0.1))',
          maskImage:
            'linear-gradient(to right, rgba(0, 0, 0, 1) 85%, rgba(0, 0, 0, 0.1))',
        }}
      >
        {CATEGORIES.map(({ icon, label, value }) => (
          <button
            key={value}
            className={classNames(
              'shrink-0 flex items-center gap-4 focus-green-primary',
              'px-4 py-2 bg-[#EFEFEF24] border border-transparent rounded-full',
              category === value
                ? 'text-green-primary border-green-primary'
                : 'text-secondary hover:text-green-primary'
            )}
            onClick={() => setCategory(value !== category ? value : null)}
          >
            {icon}
            {label}
          </button>
        ))}
        <div className="desktop:hidden shrink-0 h-full w-20"></div>
      </div>
      <div className="mt-8 max-w-page grid gap-x-8 gap-y-12 grid-cols-2 tablet:grid-cols-3 desktop:grid-cols-4">
        {INTEGRATIONS.filter(({ categories }) =>
          category ? categories.includes(category) : true
        ).map(({ icon, title, description }) => (
          <div className="flex flex-col" key={title}>
            <div className="grid place-items-center bg-secondary/80 border border-white/60 py-10 tablet:py-16">
              {icon}
            </div>
            <span className="mt-6 font-bold text-xl desktop:text-2xl text-green-primary">
              {title}
            </span>
            <span className="mt-4 text-sm tablet:text-lg desktop:text-xl text-secondary">
              {description}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
