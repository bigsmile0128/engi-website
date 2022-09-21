import React, { useState } from 'react';
import classNames from 'classnames';
import { MdCheck } from '@react-icons/all-files/md/MdCheck';
import { RiFileCopyLine } from 'react-icons/ri';
import copy from 'copy-to-clipboard';

import dynamic from 'next/dynamic';

const ReactTooltip = dynamic(() => import('react-tooltip'), {
  ssr: false,
});

type CopyButtonProps = {
  className?: string;
  value?: string;
  size?: number;
};

export default function CopyButton({
  className,
  value,
  size = 20,
}: CopyButtonProps) {
  const [copied, setCopied] = useState(false);
  return (
    <>
      <button
        className={classNames(
          'bg-transparent focus-visible:ring-2 outline-none text-white/30 hover:text-white/70',
          className
        )}
        onClick={() => {
          copy(value);
          setCopied(true);
          // show checkmark after copying for 2s
          setTimeout(() => setCopied(false), 2000);
        }}
        data-tip="Copy"
      >
        {copied ? (
          <MdCheck className="text-green-primary" size={size} />
        ) : (
          <RiFileCopyLine className="" size={size} />
        )}
      </button>
      <ReactTooltip
        effect="solid"
        getContent={() => (copied ? 'Copied' : 'Copy')}
      />
    </>
  );
}
