import React, { useState } from 'react';
import classNames from 'classnames';
import { MdCheck } from 'react-icons/md';
import { RiFileCopyLine } from 'react-icons/ri';
import copy from 'copy-to-clipboard';
import ReactTooltip from 'react-tooltip';

interface CopyLinkProps {
  className?: string;
  value?: string;
}

export default function CopyLink({ className, value = '' }: CopyLinkProps) {
  const [copied, setCopied] = useState(false);

  return (
    <div className={classNames('flex border border-gray-400', className)}>
      <input
        type="text"
        disabled
        value={value}
        className="flex-1 p-3 pr-0 bg-transparent text-white text-sm truncate"
      />
      <button
        className="p-2 bg-transparent focus:ring-2 outline-none"
        onClick={() => {
          copy(value);
          setCopied(true);
          // show checkmark after copying for 2s
          setTimeout(() => setCopied(false), 2000);
        }}
        data-tip="Copy"
      >
        {copied ? (
          <MdCheck className="text-emerald-300" size={24} />
        ) : (
          <RiFileCopyLine className="hover:text-emerald-300" size={24} />
        )}
      </button>
      <ReactTooltip
        effect="solid"
        getContent={() => (copied ? 'Copied' : 'Copy')}
      />
    </div>
  );
}
