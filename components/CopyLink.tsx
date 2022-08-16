import React, { useState } from 'react';
import classNames from 'classnames';
import { MdCheck } from '@react-icons/all-files/md/MdCheck';
import { RiFileCopyLine } from '@react-icons/all-files/ri/RiFileCopyLine';
import copy from 'copy-to-clipboard';
import ReactTooltip from 'react-tooltip';

interface CopyLinkProps {
  className?: string;
  value?: string;
}

export default function CopyLink({ className, value = '' }: CopyLinkProps) {
  const [copied, setCopied] = useState(false);

  return (
    <div className={classNames('flex border border-white/40', className)}>
      <input
        type="text"
        disabled
        value={value}
        className="flex-1 p-3 pr-0 bg-transparent text-secondary text-sm truncate"
      />
      <button
        className="p-2 bg-transparent focus:ring-2 outline-none text-green-primary hover:text-green-primary/80"
        onClick={() => {
          copy(value);
          setCopied(true);
          // show checkmark after copying for 2s
          setTimeout(() => setCopied(false), 2000);
        }}
        data-tip="Copy"
      >
        {copied ? (
          <MdCheck className="text-green-primary" size={24} />
        ) : (
          <RiFileCopyLine className="" size={24} />
        )}
      </button>
      <ReactTooltip
        effect="solid"
        getContent={() => (copied ? 'Copied' : 'Copy')}
      />
    </div>
  );
}
