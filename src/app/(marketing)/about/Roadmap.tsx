import React from 'react';
import classNames from 'classnames';

type RoadmapProps = {
  className?: string;
  items: {
    color?: 'green-primary' | 'orange-primary' | 'purple-primary';
    date: string;
    subtitle?: string;
    title: string;
  }[];
};

export default function Roadmap({ className, items }: RoadmapProps) {
  return (
    // inline-block in wrapper to make width adjust to width of elements inside
    // needed for scrollbar to exceed screen width
    <div className={classNames('relative inline-block', className)}>
      <div className="relative flex items-center px-8 tablet:px-24">
        {items.map(({ date, title, subtitle, color }, i) => {
          let translateX: string;
          if (i === 0) {
            translateX = '0';
          } else if (i === 1) {
            translateX = '-50%';
          } else {
            translateX = `-${Math.floor((i + 1) / 2) * 50}%`;
          }

          const translateY = i % 2 === 0 ? '-50%' : '50%';
          return (
            <div
              key={i}
              style={{
                transform: `translate(${translateX}, ${translateY})`,
              }}
            >
              <div
                key={i}
                className={classNames(
                  'relative flex',
                  i % 2 === 0 ? 'flex-col' : 'flex-col-reverse'
                )}
              >
                <div
                  className={classNames(
                    'relative p-4 tablet:p-8 box-shadow flex flex-col bg-[#161B28]/30'
                  )}
                  style={{
                    boxShadow: 'inset 0px 0px 0px 1px rgba(255,255,255,0.6)',
                  }}
                  key={i}
                >
                  <div
                    className={classNames('absolute w-1 left-0 top-0 h-full', {
                      // dynamic class names are not compiled and need to be specified
                      'bg-green-primary': color === 'green-primary',
                      'bg-orange-primary': color === 'orange-primary',
                      'bg-purple-primary': color === 'purple-primary',
                    })}
                  />
                  <div className="flex flex-col gap-2 tablet:gap-4">
                    <span
                      className={classNames(
                        'font-grifter text-xl tablet:text-4xl',
                        {
                          'text-green-primary': color === 'green-primary',
                          'text-orange-primary': color === 'orange-primary',
                          'text-purple-primary': color === 'purple-primary',
                        }
                      )}
                    >
                      {date}
                    </span>
                    <span className="text-xl">{title}</span>
                    {subtitle ? (
                      <span className="font-medium text-sm text-tertiary uppercase">
                        {subtitle}
                      </span>
                    ) : null}
                  </div>
                </div>
                {/* dashed line connecting to timeline */}
                <div
                  className={classNames(
                    'border-l-4 h-12 w-1 border-dashed my-1.5',
                    // extra padding to stay outside of circle
                    i % 2 === 0 ? 'mb-2.5' : 'mt-2.5',
                    {
                      'border-l-green-primary': color === 'green-primary',
                      'border-l-orange-primary': color === 'orange-primary',
                      'border-l-purple-primary': color === 'purple-primary',
                    }
                  )}
                />
                {/* circle mark on timeline */}
                <div
                  className={classNames(
                    'absolute ml-[2px] -translate-x-1/2 grid place-items-center',
                    i % 2 === 0
                      ? 'bottom-0 translate-y-1/2'
                      : 'top-0 -translate-y-1/2',
                    'h-6 w-6 border-2 rounded-full bg-dropdown',
                    {
                      'border-green-primary': color === 'green-primary',
                      'border-orange-primary': color === 'orange-primary',
                      'border-purple-primary': color === 'purple-primary',
                    }
                  )}
                >
                  <div
                    className={classNames('h-2 w-2 rounded-full', {
                      'bg-green-primary': color === 'green-primary',
                      'bg-orange-primary': color === 'orange-primary',
                      'bg-purple-primary': color === 'purple-primary',
                    })}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="absolute w-full h-1 bg-white/30 translate-y-center" />
    </div>
  );
}
