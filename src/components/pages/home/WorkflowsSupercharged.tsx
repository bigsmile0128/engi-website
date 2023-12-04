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
import { COOKBOOK_NOTION_SITE_BASE_URL, GITHUB_APP_LINK } from '~/utils/links';

type WorkflowsSuperchargedProps = {
  className?: string;
};

const ETHEREUM_SOLIDITY_DOCS_COOKBOOK = COOKBOOK_NOTION_SITE_BASE_URL;
const SOLANA_DOCS_COOKBOOK = COOKBOOK_NOTION_SITE_BASE_URL;
const INK_POLKADOT_DOCS_COOKBOOK = COOKBOOK_NOTION_SITE_BASE_URL;
const FIGMA_PLUGIN_DOWNLOAD_URL = 'coming soon';
const TYPESCRIPT_DOCS_COOKBOOK = COOKBOOK_NOTION_SITE_BASE_URL;
const CSHARP_DOCS_COOKBOOK = COOKBOOK_NOTION_SITE_BASE_URL;
const CPP_DOCS_COOKBOOK = COOKBOOK_NOTION_SITE_BASE_URL;

export const integrations = [
  {
    icon: (
      <div className="flex items-center gap-4">
        <Image className="h-12 w-auto" src={ethereumSrc} alt="ethereum" />
        <Image className="h-12 w-auto" src={soliditySrc} alt="solidity" />
      </div>
    ),
    name: 'Ethereum & Solidity',
    href: ETHEREUM_SOLIDITY_DOCS_COOKBOOK,
  },
  {
    icon: (
      <div className="flex items-center gap-4">
        <Image className="h-12 w-auto" src={inkSrc} alt="ink" />
        <Image className="h-8 w-auto" src={solanaSrc} alt="solana" />
      </div>
    ),
    name: 'Solana',
    href: SOLANA_DOCS_COOKBOOK,
  },
  {
    icon: (
      <div className="flex items-center gap-4">
        <Image className="h-12 w-auto" src={polkadotSrc} alt="polkadot" />
        <Image className="h-12 w-auto" src={inkSrc2} alt="ink" />
      </div>
    ),
    name: 'Polkadot & Ink',
    href: INK_POLKADOT_DOCS_COOKBOOK,
  },
  {
    icon: <Image className="h-12 w-auto" src={figmaSrc} alt="figma" />,
    name: 'Figma',
    href: FIGMA_PLUGIN_DOWNLOAD_URL,
    cta: 'Download Figma Plugin',
  },
  {
    icon: <SiGithub className="h-12 w-auto" />,
    name: 'GitHub',
    href: GITHUB_APP_LINK,
    cta: 'Authorize Github App',
  },
  {
    icon: (
      <Image className="h-12 w-auto" src={typescriptSrc} alt="typescript" />
    ),
    name: 'TypeScript',
    href: TYPESCRIPT_DOCS_COOKBOOK,
  },
  {
    icon: <Image className="h-12 w-auto" src={csharpSrc} alt="C#" />,
    name: 'C#',
    href: CSHARP_DOCS_COOKBOOK,
  },
  {
    icon: <Image className="h-12 w-auto" src={cplusplusSrc} alt="C++" />,
    name: 'C++',
    href: CPP_DOCS_COOKBOOK,
    disabled: true,
  },
];

export default function WorkflowsSupercharged({
  className,
}: WorkflowsSuperchargedProps) {
  return (
    <div className={classNames('flex flex-col items-center', className)}>
      <h2 className="font-grifter text-5xl mb-8 text-center">
        Seamless Integrations
      </h2>
      <span className="text-secondary text-center">
        Engi supports over a dozen languages and test frameworks as well as
        integrations with design tools and version control systems providing
        your team with varied and customizable entry points into&nbsp;
        <span className="font-semibold underline text-white decoration-green-primary">
          DeDev
        </span>
      </span>
      <Link href="/integrations">
        <Button className="mt-12 capitalize" variant="primary">
          Discover Integrations
        </Button>
      </Link>
      <div className="mt-16 grid grid-cols-2 laptop:grid-cols-3 desktop:grid-cols-4 gap-4 tablet:gap-8 w-full">
        {integrations.map(({ icon, name, href, cta, disabled }) => (
          <Link
            href={href}
            target="_blank"
            key={name}
            className={classNames({
              'flex flex-col items-center p-6 gap-4': true,
              'bg-secondary/40 backdrop-blur-[200px]': true,
              'border border-image-gradient group': true,
              'hover:border-image-gradient-green-primary': !disabled,
            })}
          >
            {icon}
            <div
              className={classNames({
                'relative flex items-center justify-center h-6 w-full': true,
                'font-bold text-xs whitespace-nowrap': true,
                'transition-transform group-hover:rotate-y-180': !disabled,
              })}
              style={{ perspective: 600, transformStyle: 'preserve-3d' }}
            >
              <div
                className={classNames({
                  'absolute backface-hidden': true,
                  'text-gray-400': disabled,
                })}
              >
                {disabled ? 'Coming Soon' : name}
              </div>
              <div className="absolute backface-hidden rotate-y-180 text-green-primary">
                {cta || 'View Documentation'}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
