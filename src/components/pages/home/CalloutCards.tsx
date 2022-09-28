import React from 'react';
import classNames from 'classnames';
import Button from '~/components/Button';

interface CalloutCardsProps {
  className?: string;
}

export default function CalloutCards({ className }: CalloutCardsProps) {
  return (
    <div
      className={classNames(
        'flex flex-col lg:flex-row gap-x-6 gap-y-12',
        className
      )}
    >
      <div className="relative flex-1 flex flex-col justify-between sm:items-start border border-gray-400 bg-gray-800/30 px-8 pt-12 pb-8">
        <div className="absolute hidden sm:block right-0 bottom-0 opacity-30">
          <svg
            className="w-40 lg:w-48"
            height="auto"
            viewBox="0 0 227 240"
            fill="none"
          >
            <g clipPath="url(#clip0_5143_26960)">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M141.551 0C63.6786 0 0 63.1279 0 141C0 218.872 63.6786 282 141.551 282C219.423 282 283.102 218.872 283.102 141C283.102 63.1279 219.423 0 141.551 0ZM195.022 163.937C186.139 184.499 165.678 198.889 141.855 198.889C118.033 198.889 97.5718 184.499 88.6892 163.937H67.7553C77.5353 195.569 107.012 218.549 141.855 218.549C176.699 218.549 206.176 195.569 215.956 163.937H195.022ZM88.6892 118.062C97.5718 97.4998 118.033 83.1098 141.855 83.1098C165.678 83.1098 186.139 97.4998 195.022 118.062H195.025C197.559 123.523 198.822 130.604 198.822 130.604H177.596H135.118H50.6789L35.3877 149.748H218.921C218.921 149.748 219.404 145.727 219.404 139.907C219.404 136.258 218.921 128.319 215.965 118.062H215.956C206.176 86.4299 176.699 63.4492 141.855 63.4492C107.012 63.4492 77.5353 86.4299 67.7553 118.062H88.6892Z"
                fill="#65FEB7"
              />
            </g>
            <defs>
              <clipPath id="clip0_5143_26960">
                <rect width="283.102" height="282" rx="100" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </div>

        <h3 className="font-grifter text-2xl sm:text-3xl">
          Write code, <span className="text-green-primary">get paid</span>
        </h3>
        <p className="text-secondary text-lg sm:pr-16 mt-4">
          No need to apply. Get paid instantly regardless of your time zone or
          language.
        </p>
        <Button variant="primary" className="mt-12">
          Coming Soon
        </Button>
      </div>
      <div className="relative flex-1 flex flex-col justify-between sm:items-start border border-gray-400 bg-gray-800/30 px-8 pt-12 pb-8">
        <div className="absolute hidden sm:block right-0 bottom-0 opacity-30">
          <svg
            className="w-40 lg:w-48"
            height="auto"
            viewBox="0 0 217 227"
            fill="none"
          >
            <path
              d="M44.2792 188.44L122.657 234.287C104.896 247.663 82.5819 253.507 60.5445 250.552C47.1681 232.791 41.3247 210.477 44.2792 188.44V188.44ZM184.617 192.504L192.152 230.976L179.538 252.54L0.490297 147.806L13.1042 126.242L50.3312 113.953L88.3301 48.9927C111.129 10.0162 158.552 -6.76144 204.862 3.83584C236.796 39.0074 245.415 88.5669 222.616 127.543L184.617 192.504ZM142.381 110.649C148.317 114.121 155.389 115.093 162.041 113.351C168.694 111.609 174.382 107.296 177.854 101.36C181.326 95.424 182.298 88.352 180.556 81.6995C178.814 75.0471 174.501 69.3592 168.565 65.887C162.629 62.4149 155.557 61.4429 148.905 63.185C142.252 64.927 136.564 69.2404 133.092 75.1762C129.62 81.112 128.648 88.184 130.39 94.8364C132.132 101.489 136.445 107.177 142.381 110.649Z"
              fill="#65FEB7"
            />
          </svg>
        </div>

        <h3 className="font-grifter text-2xl sm:text-3xl">
          Build products <span className="text-green-primary">faster</span>
        </h3>
        <p className="text-secondary text-lg sm:pr-16 mt-4">
          No sourcing. No recruiting. Find worldwide talent instantly.
        </p>
        <Button variant="primary" className="mt-12">
          Coming Soon
        </Button>
      </div>
    </div>
  );
}
