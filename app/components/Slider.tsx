import classNames from 'classnames';
import React from 'react';
import ReactSlider from 'react-slider';

export default function Slider(props: any) {
  return (
    <ReactSlider
      className="mt-8 bg-red-300"
      trackClassName=""
      markClassName=""
      marks
      ariaLabel={['min', 'max']}
      ariaValuetext={(state: any) => `${state.valueNow}`}
      renderThumb={(props: any, state: any) => {
        return (
          <div
            {...props}
            className={classNames(
              props.className,
              'relative flex h-3 w-3 items-center justify-center rounded-full bg-green-400'
            )}
          >
            <span className="-mt-10 text-xs text-green-400">
              {state.valueNow}
            </span>
          </div>
        );
      }}
      renderTrack={(props: any, state: any) => {
        return (
          <div
            {...props}
            className={classNames(props.className, 'top-[5px] h-0.5', {
              'bg-green-400': props.key === '-1',
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
