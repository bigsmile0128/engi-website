import React from 'react';
import TimeEstimate from '../components/TimeEstimate';

export default function Jobs() {
  return (
    // TODO: make responsive
    <div className="flex flex-col p-24">
      <div className="flex items-start justify-between">
        <h1 className="text-white font-grifter text-6xl">
          <span className="md:block">Discover </span>
          <span className="md:block">jobs</span>
        </h1>
        <div className="flex flex-col items-start">
          <h3 className="font-grifter text-white mb-2">Recommended for you</h3>
          {/* TODO: change to Link component */}
          <div className="bg-[#00000022] hover:bg-[#44444422] cursor-pointer p-6 flex flex-col">
            <div className="flex items-center justify-between">
              <span className="bg-red-400 text-white rounded-xl text-xs px-4 py-1 flex">
                Hot
              </span>
              <TimeEstimate duration="2 hours" />
            </div>
            <div className="flex items-center justify-between mt-8">
              <span className="shrink-0 text-gray-300 mr-20 text-sm font-semibold">
                Job Details component
              </span>
              <span className="font-grifter text-xl text-white">$540</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
