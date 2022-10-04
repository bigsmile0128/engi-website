import React from 'react';
import classNames from 'classnames';
import ReactMarkdown from 'react-markdown';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { monokai } from 'react-syntax-highlighter/dist/cjs/styles/hljs';
import remarkGfm from 'remark-gfm';

type MarkdownProps = {
  children: any;
  className?: string;
};

export default function Markdown({
  className,
  children,
  ...props
}: MarkdownProps) {
  return (
    <ReactMarkdown
      className={classNames('text-secondary', className)}
      components={{
        h1: ({ children }) => (
          <h1
            className={classNames(
              'mt-6 mb-4 pb-1 border-b border-b-white/30',
              'font-grifter text-white text-3xl'
            )}
          >
            {children}
          </h1>
        ),
        h2: ({ children }) => (
          <h2
            className={classNames(
              'mt-6 mb-4 pb-1 border-b border-b-white/30',
              'font-grifter text-white text-2xl'
            )}
          >
            {children}
          </h2>
        ),
        h3: ({ children }) => (
          <h3
            className={classNames(
              'mt-6 mb-4',
              'font-grifter text-white text-xl'
            )}
          >
            {children}
          </h3>
        ),
        h4: ({ children }) => (
          <h4
            className={classNames(
              'mt-6 mb-4 pb-1 border-b border-b-white/30',
              'font-grifter text-white text-lg'
            )}
          >
            {children}
          </h4>
        ),
        code: ({ node, inline, className, children, ...props }) => {
          const match = /language-(\w+)/.exec(className || '');
          return !inline && match ? (
            <div className="w-full overflow-auto">
              <SyntaxHighlighter
                style={monokai}
                language={match[1]}
                className="my-2 w-full"
                wrapLongLines
                {...props}
              >
                {String(children).replace(/\n$/, '')}
              </SyntaxHighlighter>
            </div>
          ) : (
            <code
              className={classNames(
                'bg-black/50 break-word whitespace-pre-wrap',
                className
              )}
              {...props}
            >
              {children}
            </code>
          );
        },
      }}
      remarkPlugins={[remarkGfm]}
      {...props}
    >
      {children}
    </ReactMarkdown>
  );
}
