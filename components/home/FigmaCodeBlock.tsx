import React, { useEffect, useRef } from 'react';
import classNames from 'classnames';
import Typed from 'typed.js';

type FigmaCodeBlockProps = {
  className?: string;
  isToggled: boolean;
  codeProps?: any;
};

export default function FigmaCodeBlock({
  className,
  codeProps = {},
  isToggled,
}: FigmaCodeBlockProps) {
  const el = useRef(null);
  const typed = useRef(null);

  useEffect(() => {
    const options = {
      strings: [
        '<span class="text-purple-400"> className=<span class="text-emerald-300">"btn"</span>></span>{text}',
        '<span class="text-purple-400">></span>Click Me',
      ],
      typeSpeed: 30,
      backSpeed: 30,
      loop: true,
      onStringTyped: (arrayPos, self) => {
        self.stop();
      },
    };

    typed.current = new Typed(el.current, options);

    return () => {
      typed.current.destroy();
    };
  }, []);

  useEffect(() => {
    typed.current?.start();
  }, [isToggled]);

  return (
    <div className={classNames('flex flex-col items-start', className)}>
      <div className="text-[11px] font-bold bg-[#253520aa] px-2 py-1">
        Button.tsx
      </div>
      <div className="relative flex text-[11px] font-bold bg-[#253520aa] leading-5">
        <div
          className={classNames(
            'border-l-[1px] z-10',
            isToggled ? 'border-emerald-400' : 'border-emerald-300'
          )}
        />
        <div className="absolute h-full w-[28px] bg-gray-600" />
        <code
          className={classNames('whitespace-pre py-1.5', codeProps?.className)}
          {...codeProps}
        >
          <div>
            <span className="relative px-2.5 mr-2 z-50">1</span>
            <span>
              <span className="text-orange-400">{'const'}</span>
              <span>{' Button = ({ text }) => ('}</span>
            </span>
          </div>
          <div>
            <span className="relative px-2.5 mr-2 z-50">2</span>
            <span>
              <span className="text-purple-400">{'  <button'}</span>
              <span ref={el} />
              <span className="text-purple-400">{'</button>'}</span>
            </span>
          </div>
          <div>
            <span className="relative px-2.5 mr-2 z-50">3</span>
            <span>
              <span>{');'}</span>
            </span>
          </div>
        </code>
      </div>
    </div>
  );
}
