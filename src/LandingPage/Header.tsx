import React, { Fragment } from 'react';

import { Popover } from '@headlessui/react';

function App() {
  return (
    <header>
      <Popover className="relative bg-transparent">
        <div className="flex justify-between items-center px-4 py-6 sm:px-6 md:justify-start md:space-x-10">
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <a className="flex items-center" href="#">
              <svg width="41" height="40" fill="none">
                <ellipse
                  cx="20.241"
                  cy="20"
                  rx="20.241"
                  ry="19.979"
                  fill="#14121E"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M20.241 28.471a8.588 8.588 0 0 0 7.883-5.114h3.103c-1.45 4.628-5.82 7.991-10.986 7.991-5.165 0-9.535-3.363-10.985-7.991h3.103a8.588 8.588 0 0 0 7.882 5.114Zm0-16.942a8.588 8.588 0 0 0-7.882 5.114H9.256c1.45-4.628 5.82-7.991 10.985-7.991 5.166 0 9.537 3.363 10.986 7.992h.002c.438 1.5.51 2.662.51 3.196 0 .852-.072 1.44-.072 1.44H4.457l2.267-2.801H28.687s-.187-1.036-.563-1.835a8.588 8.588 0 0 0-7.883-5.115Z"
                  fill="#65FEB7"
                />
              </svg>
              <span className="text-white ml-2 -mb-2 text-3xl font-grifter tracking-wide">
                engi
              </span>
            </a>
          </div>
          <Popover.Group
            as="nav"
            className="hidden md:flex space-x-10 justify-center"
          ></Popover.Group>
          <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0"></div>
        </div>
      </Popover>
    </header>
  );
}

export default App;
