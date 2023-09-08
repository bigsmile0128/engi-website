'use client';

import SyntaxHighlighter from 'react-syntax-highlighter';
import { monokai } from 'react-syntax-highlighter/dist/cjs/styles/hljs';

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div>
      <h2 className="font-medium text-xl">Something went wrong!</h2>
      <SyntaxHighlighter
        className="mt-4 !p-4 w-full !bg-[#2D2E28]/[.57] backdrop-blur-sm text-xs"
        style={monokai}
        language="json"
        wrapLongLines
      >
        {error.message}
      </SyntaxHighlighter>
    </div>
  );
}
