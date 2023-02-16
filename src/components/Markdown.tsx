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
              'mt-6 mb-4 pb-1',
              'first:mt-0 font-bold text-lg'
            )}
          >
            {children}
          </h1>
        ),
        h2: ({ children }) => (
          <h2 className={classNames('mt-6 mb-4 pb-1', 'first:mt-0')}>
            {children}
          </h2>
        ),
        h3: ({ children }) => (
          <h3
            className={classNames('mt-6 mb-4', 'first:mt-0 font-bold text-sm')}
          >
            {children}
          </h3>
        ),
        h4: ({ children }) => (
          <h4 className={classNames('mt-6 mb-4 pb-1', 'first:mt-0 font-bold')}>
            {children}
          </h4>
        ),
        h5: ({ children }) => (
          <h5 className={classNames('mt-6 mb-4 pb-1', 'first:mt-0 text-sm')}>
            {children}
          </h5>
        ),
        h6: ({ children }) => (
          <h6 className={classNames('mt-6 mb-4 pb-1', 'first:mt-0 text-xs')}>
            {children}
          </h6>
        ),
        code: ({ node, inline, className, children, ...props }) => {
          const match = /language-(\w+)/.exec(className || '');
          return !inline && match ? (
            <div className="w-full overflow-auto">
              <SyntaxHighlighter
                style={monokai}
                language={match?.[1]}
                className="!p-4 w-full !bg-[#2D2E28]/[.57] backdrop-blur-sm"
                wrapLongLines
                {...props}
              >
                {String(children).replace(/\n$/, '')}
              </SyntaxHighlighter>
            </div>
          ) : (
            <code
              className={classNames(
                'bg-[#2D2E28]/[.57] backdrop-blur-sm break-word whitespace-pre-wrap',
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
