import React from 'react';
import classNames from 'classnames';
import SocialMedia from 'components/layout/SocialMedia';
import Button from 'components/Button';

interface ContactUsPageProps {
  className?: string;
}

export default function ContactUsPage({ className }: ContactUsPageProps) {
  return (
    <div
      className={classNames(
        'max-w-page flex flex-col md:flex-row gap-16 mt-32 mb-32',
        className
      )}
    >
      <div className="flex-1 flex flex-col">
        <h1 className="font-grifter text-6xl">Contact Us</h1>
        <p className="mt-12">
          Whether you’re a business looking to accelerate your software team or
          a freelance programmer looking to work flexibly from anywhere in the
          world, Engi is the platform for you. We’re happy to answer your
          questions - don’t be shy!
        </p>
        <div className="h-[1px] w-3/4 md:w-1/2 bg-white/30 my-16" />
        <p className="">
          Miami, Florida, 33131
          <br />
          <br />
          (555) 555-5555
          <br />
          contact@engi.network
        </p>
        <SocialMedia className="mt-12" />
      </div>
      <div className="flex-1 flex flex-col gap-y-8">
        <div className="flex flex-col gap-y-2">
          <label htmlFor="name" className="font-bold text-lg">
            Name
          </label>
          <input
            type="text"
            id="name"
            placeholder="Name"
            className="w-full border border-gray-400 p-4 text-white placeholder:text-gray-300 focus:outline-none focus:ring-1 bg-transparent"
          />
        </div>
        <div className="flex flex-col gap-y-2">
          <label htmlFor="email" className="font-bold text-lg">
            Email
          </label>
          <input
            type="text"
            id="email"
            placeholder="Email"
            className="w-full border border-gray-400 p-4 text-white placeholder:text-gray-300 focus:outline-none focus:ring-1 bg-transparent"
          />
        </div>
        <div className="flex flex-col gap-y-2">
          <label htmlFor="subject" className="font-bold text-lg">
            Subject
          </label>
          <input
            type="text"
            id="subject"
            placeholder="Subject"
            className="w-full border border-gray-400 p-4 text-white placeholder:text-gray-300 focus:outline-none focus:ring-1 bg-transparent"
          />
        </div>
        <Button>Submit</Button>
      </div>
    </div>
  );
}
