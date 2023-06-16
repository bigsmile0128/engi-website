'use client';

import { Disclosure } from '@headlessui/react';
import classNames from 'classnames';
import { HiChevronDown, HiChevronUp } from 'react-icons/hi';

type FrequentlyAskedQuestionsProps = {
  className?: string;
};

const questions = [
  {
    title: 'Am I guaranteed to earn Engi if I push code?',
    description:
      "No. Engi moves the competitive dynamics of professional engineering from the whiteboard to the keyboard. May the best coders win... thankfully, there's always plent of opportunity and you can always try again.",
  },
  {
    title: 'Do I need anything to sign up?',
    description:
      "You'll need to be able to pay for gas on the network and edit code locally. A laptop and a digital wallet is all you need.",
  },
  {
    title: 'When do I get paid?',
    description:
      "After winning a bounty, it's payout will be immediately transfered to your wallet. You can cash out anytime to the currency of your choice or hold your ENGI.",
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
