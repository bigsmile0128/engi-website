'use client';

import { Disclosure } from '@headlessui/react';
import classNames from 'classnames';
import { HiChevronDown, HiChevronUp } from 'react-icons/hi';

type FrequentlyAskedQuestionsProps = {
  className?: string;
};

const questions = [
  {
    title: 'What is Engi based on?',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus in elit vel mauris tincidunt porta.',
  },
  {
    title: 'Do I need anything to sign up?',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus in elit vel mauris tincidunt porta.',
  },
  {
    title: 'How do I get paid?',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus in elit vel mauris tincidunt porta.',
  },
  {
    title: 'What do I need to create a Bit?',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus in elit vel mauris tincidunt porta.',
  },
];

export default function FrequentlyAskedQuestions({
  className,
}: FrequentlyAskedQuestionsProps) {
  return (
    <div className={classNames('', className)}>
      <p className="font-grifter text-4xl tablet:text-5xl tablet:text-center tablet:leading-[4rem]">
        Frequently Asked Questions
      </p>
      <div className="mt-8 w-full flex flex-col">
        {questions.map(({ title, description }) => (
          <Disclosure
            as="div"
            key={title}
            className="w-full py-8 border-b border-b-white/20"
          >
            {({ open }) => (
              <>
                <Disclosure.Button
                  className={classNames(
                    'w-full font-bold text-xl flex items-start justify-between gap-8',
                    open
                      ? 'text-green-primary'
                      : 'text-white hover:text-green-primary'
                  )}
                >
                  <span className="text-left">{title}</span>
                  {open ? (
                    <HiChevronUp className="mt-1 text-white" />
                  ) : (
                    <HiChevronDown className="mt-1 text-white" />
                  )}
                </Disclosure.Button>
                <Disclosure.Panel className="mt-4 text-lg text-secondary">
                  {description}
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        ))}
      </div>
    </div>
  );
}
