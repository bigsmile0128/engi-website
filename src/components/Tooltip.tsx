'use client';

import React from 'react';
import { usePopperTooltip } from 'react-popper-tooltip';
import 'react-popper-tooltip/dist/styles.css';
import ClientOnlyPortal from './ClientOnlyPortal';

type TooltipProps = {
  children: any;
  title: any;
};

export default function Tooltip({ title, children }: TooltipProps) {
  const {
    getArrowProps,
    getTooltipProps,
    setTooltipRef,
    setTriggerRef,
    visible,
  } = usePopperTooltip({ offset: [0, 10] });

  return (
    <>
      {React.cloneElement(children, { ref: setTriggerRef })}
      {visible && (
        <ClientOnlyPortal selector="#portal">
          <div
            ref={setTooltipRef}
            {...getTooltipProps({
              className: 'tooltip-container !py-2 !px-3',
              style: {
                border: 'none',
              },
            })}
          >
            <div
              {...getArrowProps({
                // className: 'tooltip-arrow',
              })}
            />
            {title}
          </div>
        </ClientOnlyPortal>
      )}
    </>
  );
}
