import classNames from 'classnames';
import React from 'react';
import dynamic from 'next/dynamic';

const ReactSlider = dynamic(import('react-slider'), { ssr: false });

export default function Slider(props) {
  return (
    <ReactSlider
      className="mt-8 h-4"
      trackClassName=""
      markClassName=""
      marks
      ariaLabel={['min', 'max']}
      ariaValuetext={(state) => `${state.valueNow}`}
      renderThumb={(props, state) => {
        return (
          <div
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
      renderTrack={(props) => {
        return (
          <div
            {...props}
            className={classNames(props.className, 'h-0.5 top-[5px]', {
              'bg-green-primary': props.key === '-1',
              'bg-[#FFFFFF22]': props.key === '-0' || props.key === '-2',
            })}
          />
        );
      }}
      pearling
      {...props}
    />
  );
}
