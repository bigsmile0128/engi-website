import React from 'react';
import classNames from 'classnames';
import BlockQuote from './BlockQuote';
import Avvvatars from 'avvvatars-react';
import { AiOutlineLink } from '@react-icons/all-files/ai/AiOutlineLink';

type WhosUsingEngiProps = {
  className?: string;
};

export default function WhosUsingEngi({ className }: WhosUsingEngiProps) {
  return (
    <div className={classNames('', className)}>
      <BlockQuote
        className=""
        value="We built engi using engi"
        title="Who's using engi?"
        subtitle="The Engi protocol itself uses the network to build real software."
      />
      <Testimonials className="mt-24" />
    </div>
  );
}

function Testimonials({ className }: { className?: string }) {
  return (
    <div
      className={classNames(
        'flex flex-row justify-center gap-x-16 gap-y-16',
        className
      )}
    >
      <div className="flex flex-col">
        <p className="text-lg max-w-20">
          Browse jobs, write code, and get paid instantly no matter where you
          are.
        </p>
        <User className="mt-12" name="bc1qxy2kgdygr" subtitle="Rust Job" />
      </div>
      <div className="hidden sm:flex flex-col">
        <p className="text-lg max-w-20">
          Browse jobs, write code, and get paid instantly no matter where you
          are.
        </p>
        <User className="mt-12" name="sqtzq2n0yrf24" subtitle="Python Job" />
      </div>
      <div className="hidden md:flex flex-col">
        <p className="text-lg max-w-20">
          Browse jobs, write code, and get paid instantly no matter where you
          are.
        </p>
        <User className="mt-12" name="93p83kkfjhx0" subtitle="React Job" />
      </div>
    </div>
  );
}

type UserProps = {
  className?: string;
  name: string;
  subtitle: string;
};

function User({ className, name, subtitle }: UserProps) {
  return (
    <div className={classNames('flex items-center gap-x-4', className)}>
      <Avvvatars size={42} value={name} style="shape" />
      <div className="flex flex-col items-start">
        <span className="font-bold text-emerald-300">{name}</span>
        <span className="flex items-center gap-x-2">
          <AiOutlineLink className="inline text-emerald-300" />
          <span className="text-secondary">{subtitle}</span>
        </span>
      </div>
    </div>
  );
}
