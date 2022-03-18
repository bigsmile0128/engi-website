import React from 'react';
import TimeEstimate from '../components/TimeEstimate';

export default function Jobs() {
  return (
    <div className="flex flex-col p-24">
      <div className="flex items-start justify-between">
        <h1 className="text-white font-grifter text-6xl">
          <span className="md:block">Discover </span>
          <span className="md:block">Jobs</span>
        </h1>
        <div className="flex flex-col items-start">
          <h3 className="font-grifter text-white">Recommended for you</h3>
          <div className="bg-[#00000022] p-6 flex flex-col">
            <div className="flex justify-between items-center w-64">
              <span className="bg-orange-400 text-white rounded-xl text-xs px-4 py-1 flex">
                Hot
              </span>
              <TimeEstimate duration="2 hours" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
