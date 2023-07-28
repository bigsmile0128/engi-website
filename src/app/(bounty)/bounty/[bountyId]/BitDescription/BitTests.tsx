import { Disclosure, Transition } from '@headlessui/react';
import { ChevronRightIcon } from '@heroicons/react/outline';
import classNames from 'classnames';
import { Roboto_Mono } from 'next/font/google';
import {
  RiCheckboxCircleLine,
  RiCloseCircleLine,
  RiPauseCircleLine,
} from 'react-icons/ri';
import { Bit } from '~/types';

const robotoMono = Roboto_Mono({
  subsets: ['latin'],
});

type BitTestsProps = {
  className?: string;
  data?: Bit;
  isLoading?: boolean;
};

export default function BitTests({
  className,
  isLoading,
  data,
}: BitTestsProps) {
  return (
    <div className={classNames('flex flex-col gap-2', className)}>
      <h2
        className={classNames(
          'font-grifter text-xl inline-block',
          isLoading ? 'skeleton' : ''
        )}
      >
        Tests
      </h2>
      {isLoading ? (
        <div className="flex items-center px-8 py-6 bg-black/[.14] rounded-none children:skeleton">
          <span className="block font-medium">Placeholder</span>
        </div>
      ) : data?.tests?.length && data?.tests?.length > 0 ? (
        data?.tests.map((test, i) => (
          <Disclosure key={test.id} as="div" defaultOpen={i === 0}>
            <Disclosure.Button className="w-full">
              <div
                key={test.id}
                className="flex items-center px-8 py-6 bg-black/[.14]"
              >
                <span className="block font-medium">{test.id}</span>
                {test.result === 'PASSED' ? (
                  <RiCheckboxCircleLine className="ml-auto mr-12 h-6 w-auto text-green-primary" />
                ) : test.result === 'FAILED' ? (
                  <RiCloseCircleLine className="ml-auto mr-12 h-6 w-auto text-red-primary" />
                ) : (
                  <RiPauseCircleLine className="ml-auto mr-12 h-6 w-auto text-secondary" />
                )}
                <ChevronRightIcon className="ui-open:rotate-90 ui-open:transform h-4 w-auto" />
              </div>
            </Disclosure.Button>
            <Transition
              className="transition-all duration-500 overflow-hidden"
              enterFrom="transform opacity-0 max-h-0"
              enterTo="transform opacity-100 max-h-96"
              leaveFrom="transform opacity-100 max-h-96"
              leaveTo="transform opacity-0 max-h-0"
            >
              <Disclosure.Panel>
                {test.failedResultMessage && (
                  <div
                    className="flex"
                    style={{
                      background:
                        'linear-gradient(131deg, rgba(255, 255, 255, 0.10) 0%, rgba(255, 255, 255, 0.00) 70%, rgba(101, 254, 183, 0.1) 100%)',
                    }}
                  >
                    <div className="basis-10 shrink-0 bg-[#EBEBEB]/[.14] opacity-80 backdrop-blur-[2px]" />
                    <div
                      className={classNames(
                        'block text-sm font-medium px-8 py-6',
                        robotoMono.className
                      )}
                    >
                      {test.failedResultMessage}
                    </div>
                  </div>
                )}
                <div className="flex h-[5px] bg-orange-primary"></div>
              </Disclosure.Panel>
            </Transition>
          </Disclosure>
        ))
      ) : (
        <div>No tests found.</div>
      )}
    </div>
  );
}
