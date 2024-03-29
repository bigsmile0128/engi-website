import classNames from 'classnames';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { monokai } from 'react-syntax-highlighter/dist/cjs/styles/hljs';

type CodePreviewProps = {
  borderClassName?: string;
  className?: string;
  // display border left of line numbers
  customStyle?: any;
  id?: string;
  language?: string;
  value: string;
};

export default function CodePreview({
  className,
  language = 'javascript',
  value,
  id,
  borderClassName,
  customStyle,
  ...props
}: CodePreviewProps) {
  return (
    <div className="relative flex">
      {borderClassName && (
        <div
          className={classNames('border-l-[1px] z-10', borderClassName)}
        ></div>
      )}
      <div className="absolute h-full w-[28px] bg-gray-200" />
      <SyntaxHighlighter
        id={id}
        className={classNames(
          'react-syntax-highlighter relative text-[11px] leading-5',
          className
        )}
        customStyle={{
          background: '#253520aa',
          padding: '0.75em 0.5em',
          ...(customStyle ?? {}),
        }}
        language={language}
        style={monokai}
        showLineNumbers
        wrapLines
        codeTagProps={{
          className: '',
        }}
        {...props}
      >
        {value}
      </SyntaxHighlighter>
    </div>
  );
}
