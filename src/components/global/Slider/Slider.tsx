'use client';

import classNames from 'classnames';
import React from 'react';
import ReactSlider, { ReactSliderProps } from 'react-slider';

export default function Slider(props: ReactSliderProps) {
  return (
    <ReactSlider
      className="mt-8 h-4"
      trackClassName=""
      markClassName=""
      marks
      ariaValuetext={(state) => `${state.valueNow}`}
      renderThumb={({ key, ...props }, state) => {
        return (
          <div
            // key needs to be added to div outside of a spread operator to prevent nextjs error
            key={key}
            {...props}
            className={classNames(
              props.className,
              'h-3 w-3 bg-green-primary rounded-full relative flex justify-center items-center focus-green-primary'
            )}
          >
            <span className="-mt-10 text-green-primary text-xs">
              {state.valueNow}
            </span>
          </div>
        );
      }}
      renderTrack={({ key, ...props }) => {
        return (
          <div
            key={key}
            {...props}
            className={classNames(props.className, 'h-0.5 top-[5px]', {
              'bg-green-primary': key === '-1',
              'bg-[#FFFFFF22]': key === '-0' || key === '-2',
            })}
          />
        );
      }}
      {...props}
    />
  );
}
