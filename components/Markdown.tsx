import React from 'react';
import classNames from 'classnames';
import ReactMarkdown from 'react-markdown';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { monokai } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import remarkGfm from 'remark-gfm';

type MarkdownProps = {
  className?: string;
  children: any;
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
              'font-bold text-white text-3xl'
            )}
          >
            {children}
          </h1>
        ),
        h2: ({ children }) => (
          <h1
            className={classNames(
              'mt-6 mb-4 pb-1 border-b border-b-white/30',
              'font-bold text-white text-2xl'
            )}
          >
            {children}
          </h1>
        ),
        h3: ({ children }) => (
          <h1
            className={classNames('mt-6 mb-4', 'font-bold text-white text-xl')}
          >
            {children}
          </h1>
        ),
        h4: ({ children }) => (
          <h1
            className={classNames(
              'mt-6 mb-4 pb-1 border-b border-b-white/30',
              'font-bold text-white text-lg'
            )}
          >
            {children}
          </h1>
        ),
        code: ({ node, inline, className, children, ...props }) => {
          const match = /language-(\w+)/.exec(className || '');
          return !inline && match ? (
            <SyntaxHighlighter
              style={monokai}
              language={match[1]}
              className="my-2"
              {...props}
            >
              {String(children).replace(/\n$/, '')}
            </SyntaxHighlighter>
          ) : (
            <code className={classNames('bg-black/50', className)} {...props}>
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
