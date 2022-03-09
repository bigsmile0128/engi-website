import React, { Fragment } from 'react';

import { Popover } from '@headlessui/react';

function App() {
  return (
    <header>
      <Popover className="relative bg-transparent">
        <div className="flex justify-between items-center px-4 py-6 sm:px-6 md:justify-start md:space-x-10">
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <a href="#">
              <img
                className="h-8 w-auto sm:h-10"
                src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                alt="engi"
              />
            </a>
          </div>
          <Popover.Group
            as="nav"
            className="hidden md:flex space-x-10 justify-center"
          >
            <a
              href="#"
              className="text-base font-medium text-gray-500 hover:text-gray-900"
            >
              About
            </a>
            <a
              href="#"
              className="text-base font-medium text-gray-500 hover:text-gray-900"
            >
              Contact
            </a>
          </Popover.Group>
          <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0"></div>
        </div>
      </Popover>
    </header>
  );
}

export default App;
