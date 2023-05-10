'use client';

import { MdCheck } from '@react-icons/all-files/md/MdCheck';
import classNames from 'classnames';
import copy from 'copy-to-clipboard';
import { useState } from 'react';
import { RiFileCopyLine } from 'react-icons/ri';
import Tooltip from './Tooltip';

type CopyButtonProps = {
  className?: string;
  size?: number;
  value?: string;
};

export default function CopyButton({
  className,
  value,
  size = 20,
}: CopyButtonProps) {
  const [copied, setCopied] = useState(false);
  return (
    <Tooltip title={<span>{copied ? 'Copied' : 'Copy'}</span>}>
      <button
        className={classNames(
          'bg-transparent focus-visible:ring-2 outline-none text-white/30 hover:text-white/70',
          className
        )}
        onClick={() => {
          copy(value ?? '');
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
    </Tooltip>
  );
}
