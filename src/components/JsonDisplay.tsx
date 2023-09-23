'use client';

import classNames from 'classnames';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { monokai } from 'react-syntax-highlighter/dist/cjs/styles/hljs';

type JsonDisplayProps = {
  className?: string;
  value: string;
};

export default function JsonDisplay({ className, value }: JsonDisplayProps) {
  return (
    <SyntaxHighlighter
      className={classNames(
        '!p-4 w-full !bg-[#2D2E28]/[.57] backdrop-blur-sm text-xs',
        className
      )}
      style={monokai}
      language="json"
      wrapLongLines
    >
      {value}
    </SyntaxHighlighter>
  );
}
