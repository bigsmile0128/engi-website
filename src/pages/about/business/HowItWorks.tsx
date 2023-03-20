import { Disclosure } from '@headlessui/react';
import classNames from 'classnames';
import { HiMinus, HiPlus } from 'react-icons/hi';

type HowItWorksProps = {
  className?: string;
};

const items = [
  {
    title: 'Post a job',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus in elit vel mauris tincidunt porta.',
  },
  {
    title: 'Start a job',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus in elit vel mauris tincidunt porta.',
  },
  {
    title: 'Build products faster',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus in elit vel mauris tincidunt porta.',
  },
];

export default function HowItWorks({ className }: HowItWorksProps) {
  return (
    <div className={classNames('xl:flex xl:items-center xl:gap-16', className)}>
      <div className="tablet:text-center xl:text-left">
        <p className="font-grifter text-4xl tablet:text-5xl">How It Works?</p>
        <p className="text-secondary text-lg mt-4 tablet:mt-8">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus in
          elit vel mauris tincidunt porta.
        </p>
      </div>
      <div className="mt-8 w-full flex flex-col tablet:gap-6 xl:gap-0 xl:mt-0">
        {items.map(({ title, description }, i) => (
          <Disclosure key={title}>
            {({ open }) => (
              <div
                className={classNames(
                  'w-full border',
                  '-mt-[1px]', // negative margin for shared borders
                  'xl:px-12 xl:h-64 xl:flex xl:items-center',
                  open
                    ? 'bg-[#161B28]/30 border-green-primary'
                    : 'border-white/30'
                )}
              >
                <Disclosure.Button
                  className={classNames('w-full p-6 xl:h-full xl:p-0')}
                >
                  <div className="w-full font-bold text-2xl flex items-start xl:items-center gap-4 xl:gap-12">
                    <div className="font-grifter text-green-primary -mb-1">
                      {(i + 1).toString().padStart(2, '0')}
                    </div>
                    <div className="flex-1 flex flex-col gap-6">
                      <div className="flex justify-between">
                        <span className="font-grifter -mb-1 text-left">
                          {title}
                        </span>
                        {open ? (
                          <HiMinus className="text-white hidden tablet:block xl:hidden" />
                        ) : (
                          <HiPlus className="text-white hidden tablet:block xl:hidden" />
                        )}
                      </div>
                      <Disclosure.Panel
                        className={classNames(
                          'font-medium text-xl text-left tablet:hidden xl:block'
                        )}
                      >
                        {description}
                      </Disclosure.Panel>
                    </div>
                  </div>
                </Disclosure.Button>
                {/* TABLET: separate panel to line up to left of number instead of title */}
                <Disclosure.Panel
                  className={classNames(
                    'p-6 pt-0 font-medium text-xl hidden tablet:block xl:hidden'
                  )}
                >
                  {description}
                </Disclosure.Panel>
              </div>
            )}
          </Disclosure>
        ))}
      </div>
    </div>
  );
}
