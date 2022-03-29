import React from 'react';

import { Link, Outlet } from 'react-router-dom';
import isDevEnv from '../utils';

export default function Layout() {
  return (
    <div className="bg-landing bg-cover relative min-h-screen">
      <nav className="shrink-0">
        <div className="relative bg-transparent">
          <div className="flex justify-between items-center px-4 py-6 sm:px-6 md:justify-start md:space-x-10">
            <div className="flex justify-start lg:w-0 lg:flex-1">
              <Link to="/">
                <svg
                  className="scale-75"
                  width="83"
                  height="37"
                  viewBox="0 0 83 37"
                  fill="none"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M80.9796 0C79.8636 0 78.959 0.90465 78.959 2.02059C78.959 3.13653 79.8636 4.04118 80.9796 4.04118C82.0955 4.04118 83.0002 3.13653 83.0002 2.02059C83.0002 0.90465 82.0955 0 80.9796 0ZM22.7168 19.8951C21.4528 22.8211 18.541 24.8689 15.1509 24.8689C11.7609 24.8689 8.84914 22.8211 7.5851 19.8951H4.60608C5.99783 24.3964 10.1925 27.6666 15.1509 27.6666C20.1094 27.6666 24.3041 24.3964 25.6958 19.8951H22.7168ZM7.5851 13.367C8.84914 10.441 11.7609 8.39326 15.1509 8.39326C18.541 8.39326 21.4528 10.441 22.7168 13.367H22.7172C23.0779 14.1442 23.2576 15.1518 23.2576 15.1518H20.237H14.1922H2.17602L0 17.8761H26.1179C26.1179 17.8761 26.1865 17.3038 26.1865 16.4756C26.1865 15.9563 26.1179 14.8267 25.6971 13.367H25.6958C24.3041 8.86573 20.1094 5.59552 15.1509 5.59552C10.1925 5.59552 5.99783 8.86573 4.60608 13.367H7.5851ZM47.5618 23.9363V16.1648C47.5618 11.8727 44.0824 8.39326 39.7903 8.39326C35.4982 8.39326 32.0188 11.8727 32.0188 16.1648V23.9363V24.8689V27.6666H29.221V16.1648C29.221 10.3275 33.9531 5.59552 39.7903 5.59552C45.6275 5.59552 50.3595 10.3275 50.3595 16.1648V27.6666H47.5618V24.8689V23.9363ZM64.5038 24.8666C69.0522 24.8666 72.7394 21.1794 72.7394 16.6311C72.7394 12.0827 69.0522 8.39552 64.5038 8.39552C59.9555 8.39552 56.2683 12.0827 56.2683 16.6311C56.2683 21.1794 59.9555 24.8666 64.5038 24.8666ZM75.5387 16.7534C75.5391 16.7127 75.5394 16.6719 75.5394 16.6311C75.5394 16.5902 75.5391 16.5495 75.5387 16.5088V6.52857H72.741V9.287C70.7199 7.02179 67.7784 5.59552 64.5038 5.59552C58.4091 5.59552 53.4683 10.5363 53.4683 16.6311C53.4683 22.7258 58.4091 27.6666 64.5038 27.6666C67.7784 27.6666 70.7199 26.2403 72.741 23.9751V25.9573C72.741 30.5069 69.0528 34.1951 64.5032 34.1951C61.1131 34.1951 58.2014 32.1474 56.9373 29.2214H53.9583C55.35 33.7227 59.5447 36.9929 64.5032 36.9929C70.5979 36.9929 75.5387 32.0521 75.5387 25.9573V16.7534ZM79.5798 6.52857H82.3775V27.6671H79.5798V6.52857Z"
                    fill="white"
                  />
                </svg>
              </Link>
            </div>
            {isDevEnv() && (
              <div className="hidden md:flex space-x-10 justify-center">
                <Link
                  to="/"
                  className="text-base font-medium text-gray-200 hover:text-white"
                >
                  About
                </Link>
                <Link
                  to="/jobs"
                  className="text-base font-medium text-gray-200 hover:text-white"
                >
                  Earn
                </Link>
                <Link
                  to="/hire"
                  className="text-base font-medium text-gray-200 hover:text-white"
                >
                  Hire
                </Link>
              </div>
            )}
            <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0"></div>
          </div>
        </div>
        {/* TODO: add popover for hamburger menu on mobile */}
      </nav>
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
}
