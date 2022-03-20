import classNames from 'classnames';
import React from 'react';
import ReactSlider from 'react-slider';

export default function Slider(props) {
  return (
    <ReactSlider
      className="mt-8 bg-red-300"
      trackClassName=""
      markClassName=""
      defaultValue={[2, 6]}
      marks
      min={1}
      max={10}
      ariaLabel={['min', 'max']}
      ariaValuetext={(state) => `${state.valueNow}`}
      renderThumb={(props, state) => {
        return (
          <div
            {...props}
            className={classNames(
              props.className,
              'h-3 w-3 bg-green-400 rounded-full relative flex justify-center items-center'
            )}
          >
            <span className="-mt-10 text-green-400 text-xs">
              {state.valueNow}
            </span>
          </div>
        );
      }}
      renderTrack={(props, state) => {
        return (
          <div
            {...props}
            className={classNames(props.className, 'h-0.5 top-[5px]', {
              'bg-green-400': props.key === '-1',
              'bg-[#FFFFFF22]': props.key === '-0' || props.key === '-2',
            })}
          />
        );
      }}
      minDistance={1}
      pearling
    />
  );
}
