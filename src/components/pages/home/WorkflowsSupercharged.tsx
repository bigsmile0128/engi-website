import React from 'react';
import classNames from 'classnames';
import Button from '~/components/global/Button/Button';
import Link from 'next/link';
import Image from 'next/image';
import ethereumSrc from 'public/img/home/ethereum.png';
import soliditySrc from 'public/img/home/solidity.png';
import inkSrc from 'public/img/home/ink.png';
import inkSrc2 from 'public/img/home/ink2.png';
import solanaSrc from 'public/img/home/solana.png';
import polkadotSrc from 'public/img/home/polkadot.png';
import figmaSrc from 'public/img/home/figma.png';
import typescriptSrc from 'public/img/home/typescript.png';
import csharpSrc from 'public/img/home/csharp.png';
import cplusplusSrc from 'public/img/home/cplusplus.png';
import { SiGithub } from 'react-icons/si';

type WorkflowsSuperchargedProps = {
  className?: string;
};

export const integrations = [
  {
    icon: (
      <div className="flex items-center gap-4">
        <Image className="h-12 w-auto" src={ethereumSrc} alt="ethereum" />
        <Image className="h-12 w-auto" src={soliditySrc} alt="solidity" />
      </div>
    ),
    name: 'Ethereum & Solidity',
    href: 'https://button-produce-60a.notion.site/Engi-Cookbook-68c2d1347ecd499d8901ae387829ba10',
  },
  {
    icon: (
      <div className="flex items-center gap-4">
        <Image className="h-12 w-auto" src={inkSrc} alt="ink" />
        <Image className="h-8 w-auto" src={solanaSrc} alt="solana" />
      </div>
    ),
    name: 'Ink & Solana',
    href: 'https://button-produce-60a.notion.site/Engi-Cookbook-68c2d1347ecd499d8901ae387829ba10',
  },
  {
    icon: (
      <div className="flex items-center gap-4">
        <Image className="h-12 w-auto" src={polkadotSrc} alt="polkadot" />
        <Image className="h-12 w-auto" src={inkSrc2} alt="ink" />
      </div>
    ),
    name: 'Polkadot & Ink',
    href: 'https://button-produce-60a.notion.site/Engi-Cookbook-68c2d1347ecd499d8901ae387829ba10',
  },
  {
    icon: <Image className="h-12 w-auto" src={figmaSrc} alt="figma" />,
    name: 'Figma',
    href: 'https://button-produce-60a.notion.site/Engi-Cookbook-68c2d1347ecd499d8901ae387829ba10',
  },
  {
    icon: <SiGithub className="h-12 w-auto" />,
    name: 'GitHub',
    href: 'https://button-produce-60a.notion.site/Engi-Cookbook-68c2d1347ecd499d8901ae387829ba10',
  },
  {
    icon: (
      <Image className="h-12 w-auto" src={typescriptSrc} alt="typescript" />
    ),
    name: 'TypeScript',
    href: 'https://button-produce-60a.notion.site/Engi-Cookbook-68c2d1347ecd499d8901ae387829ba10',
  },
  {
    icon: <Image className="h-12 w-auto" src={csharpSrc} alt="C#" />,
    name: 'C#',
    href: 'https://button-produce-60a.notion.site/Engi-Cookbook-68c2d1347ecd499d8901ae387829ba10',
  },
  {
    icon: <Image className="h-12 w-auto" src={cplusplusSrc} alt="C++" />,
    name: 'C++',
    href: 'https://button-produce-60a.notion.site/Engi-Cookbook-68c2d1347ecd499d8901ae387829ba10',
  },
];

export default function WorkflowsSupercharged({
  className,
}: WorkflowsSuperchargedProps) {
  return (
    <div className={classNames('flex flex-col items-center', className)}>
      <h2 className="font-grifter text-5xl mb-8 text-center">
        Your Workflows Supercharged
      </h2>
      <span className="text-secondary px-24 text-center">
        {`
          As an innovative technology businesses, you can seamlessly integrate
          Engi's new crowdsourced programming into your existing workflows. Engi
          supports all popular testing frameworks for languages such as Rust,
          TypeScript, Python, C#, and more. Draft Ul engineering jobs straight
          from your design tools or from your version control systems.
          `.trim()}
      </span>
      {/* TODO: update with ENGIN-972 add integrations page */}
      <Button className="mt-12" variant="primary">
        See all integrations
      </Button>
      <div className="mt-16 grid grid-cols-2 laptop:grid-cols-3 desktop:grid-cols-4 gap-4 tablet:gap-8 w-full">
        {integrations.map(({ icon, name, href }) => (
          <Link
            href={href}
            target="_blank"
            key={name}
            className={classNames(
              'flex flex-col items-center p-6 gap-4',
              'bg-secondary/40 backdrop-blur-[200px]',
              'border border-image-gradient hover:border-image-gradient-green-primary group'
            )}
          >
            {icon}
            <div
              className={classNames(
                'relative flex items-center justify-center h-6 w-full',
                'font-bold text-xs whitespace-nowrap',
                'transition-transform group-hover:rotate-y-180'
              )}
              style={{ perspective: 600, transformStyle: 'preserve-3d' }}
            >
              <div className="absolute backface-hidden">{name}</div>
              <div className="absolute backface-hidden rotate-y-180 text-green-primary">
                View Documentation
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
