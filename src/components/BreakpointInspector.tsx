import React from 'react';
import classNames from 'classnames';

type BreakpointInspectorProps = {
  className?: string;
};

export default function BreakpointInspector({
  className,
}: BreakpointInspectorProps) {
  return (
    <div
      className={classNames(
        'hidden fixed left-0 bottom-0 px-1',
        'text-xs bg-secondary border-t border-r border-white/30',
        className
      )}
    >
      <span className="hidden xs:block tablet:hidden">xs</span>
      <span className="hidden tablet:block laptop:hidden">tablet</span>
      <span className="hidden laptop:block desktop:hidden">laptop</span>
      <span className="hidden desktop:block xl:hidden">desktop</span>
      <span className="hidden xl:block">xl</span>
    </div>
  );
}
