import React from 'react';
import classNames from 'classnames';
import Image from 'next/image';

import deskImg from 'components/press/img/desk.jpg';
import BlockQuote from 'components/home/BlockQuote';
import GridPattern from 'components/GridPattern';

interface AboutUsPageProps {
  className?: string;
}

export default function AboutUsPage({ className }: AboutUsPageProps) {
  return (
    <div className={classNames('flex flex-col my-32 mb-32', className)}>
      <div className="max-w-page mb-24 md:!max-w-2xl">
        <h1 className="font-grifter text-3xl sm:text-5xl text-center !leading-tight">
          Accelerating the <span className="text-emerald-300">future</span> of
          software engineering
        </h1>
        <p className="mt-8 text-gray-300 text-center">
          We are a marketplace for custom software. Engineers come for
          flexibility, accessibility, and growth. Work whenever, wherever, and
          however on the jobs that you want. Businesses come for new access to
          programmers across the world.{' '}
        </p>
      </div>
      <div className="max-w-page mb-32">
        <div className="md:grid grid-cols-2 grid-flow-row-dense gap-24 items-center mx-6 md:mx-0 mb-24">
          <div className="mb-12 md:mb-0">
            <h2 className="font-grifter text-3xl mb-4">Our Mission</h2>
            <p className="text-gray-300">
              To unlock human innovation and end global poverty through
              always-available and accessible engineering work and to accelerate
              the future of accessible, flexible and equitable software
              engineering work for coders everywhere.
            </p>
          </div>
          <div className="max-w-md md:max-w-none mx-auto">
            <Image
              className="h-3/4 w-3/4 mx-auto"
              src={deskImg}
              alt="figma plugins"
            />
          </div>
        </div>
        <div className="md:grid grid-cols-2 grid-flow-row-dense gap-24 items-center mx-6 md:mx-0">
          <div className="mb-12 md:mb-0 col-start-2">
            <h2 className="font-grifter text-3xl mb-4">Who we are</h2>
            <p className="text-gray-300">
              Engi deletes applications, interviews, bosses, time zones,
              borders, language barriers, and “culture fit” from professional
              software engineering engagements. We empower freelance coders by
              building an accessible and flexible labor economy that minimally
              obstructs participation and growth.
            </p>
          </div>
          <div className="max-w-md md:max-w-none mx-auto relative col-start-1">
            <Image src={deskImg} alt="ipad website" />
          </div>
        </div>
      </div>
      <div className="relative">
        <GridPattern offset={-1} />
        <div className="flex flex-col items-center py-16">
          <h2 className="text-4xl font-grifter mb-16">Values</h2>
          <div className="flex flex-col sm:flex-row items-center gap-x-12 gap-y-24">
            <div className="flex flex-col items-center gap-y-8">
              <div className="border border-gray-500 h-20 w-20 flex items-center justify-center bg-gray-800/60 z-10">
                <svg
                  width="28"
                  height="36"
                  viewBox="0 0 28 36"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12.3333 27H7.23493C6.73993 24.8783 4.5066 23.1433 3.58993 22C2.02025 20.0388 1.03651 17.6741 0.75204 15.1782C0.467568 12.6824 0.893934 10.157 1.98202 7.89286C3.07011 5.62876 4.77566 3.71808 6.90219 2.38093C9.02873 1.04378 11.4897 0.334559 14.0017 0.334961C16.5137 0.335363 18.9745 1.04537 21.1006 2.3832C23.2267 3.72103 24.9317 5.63226 26.019 7.89671C27.1064 10.1612 27.5319 12.6867 27.2467 15.1825C26.9614 17.6782 25.9769 20.0426 24.4066 22.0033C23.4899 23.145 21.2599 24.88 20.7649 27H15.6666V18.6666H12.3333V27ZM20.6666 30.3333V32C20.6666 32.884 20.3154 33.7319 19.6903 34.357C19.0652 34.9821 18.2173 35.3333 17.3333 35.3333H10.6666C9.78255 35.3333 8.9347 34.9821 8.30958 34.357C7.68446 33.7319 7.33327 32.884 7.33327 32V30.3333H20.6666Z"
                    fill="white"
                  />
                </svg>
              </div>
              <h3 className="font-bold text-lg text-emerald-300">Empowering</h3>
              <p className="w-60 sm:w-40 md:w-48 lg:w-72 text-center text-lg">
                Learn To Love Growth And Change And You Will Be A Success
              </p>
            </div>
            <div className="flex flex-col items-center gap-y-8">
              <div className="border border-gray-500 h-20 w-20 flex items-center justify-center bg-gray-800/60 z-10">
                <svg
                  width="28"
                  height="38"
                  viewBox="0 0 28 38"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8.16341 31.3334H19.8367C18.7341 33.9706 16.6373 36.0675 14.0001 37.1701C11.3629 36.0675 9.26602 33.9706 8.16341 31.3334ZM24.0001 22.6751L27.3334 26.4551V29.6667H0.666748V26.4551L4.00008 22.6751V13.0001C4.00008 7.19505 8.17341 2.25505 14.0001 0.425049C19.8267 2.25505 24.0001 7.19505 24.0001 13.0001V22.6751ZM14.0001 16.3334C14.8841 16.3334 15.732 15.9822 16.3571 15.3571C16.9822 14.732 17.3334 13.8841 17.3334 13.0001C17.3334 12.116 16.9822 11.2682 16.3571 10.643C15.732 10.0179 14.8841 9.66672 14.0001 9.66672C13.116 9.66672 12.2682 10.0179 11.6431 10.643C11.0179 11.2682 10.6667 12.116 10.6667 13.0001C10.6667 13.8841 11.0179 14.732 11.6431 15.3571C12.2682 15.9822 13.116 16.3334 14.0001 16.3334Z"
                    fill="white"
                  />
                </svg>
              </div>
              <h3 className="font-bold text-lg text-emerald-300">
                Accelerating
              </h3>
              <p className="w-60 sm:w-40 md:w-48 lg:w-72 text-center text-lg">
                Learn To Love Growth And Change And You Will Be A Success
              </p>
            </div>
            <div className="flex flex-col items-center gap-y-8">
              <div className="border border-gray-500 h-20 w-20 flex items-center justify-center bg-gray-800/60 z-10">
                <svg
                  width="28"
                  height="36"
                  viewBox="0 0 28 36"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12.3333 27H7.23493C6.73993 24.8783 4.5066 23.1433 3.58993 22C2.02025 20.0388 1.03651 17.6741 0.75204 15.1782C0.467568 12.6824 0.893934 10.157 1.98202 7.89286C3.07011 5.62876 4.77566 3.71808 6.90219 2.38093C9.02873 1.04378 11.4897 0.334559 14.0017 0.334961C16.5137 0.335363 18.9745 1.04537 21.1006 2.3832C23.2267 3.72103 24.9317 5.63226 26.019 7.89671C27.1064 10.1612 27.5319 12.6867 27.2467 15.1825C26.9614 17.6782 25.9769 20.0426 24.4066 22.0033C23.4899 23.145 21.2599 24.88 20.7649 27H15.6666V18.6666H12.3333V27ZM20.6666 30.3333V32C20.6666 32.884 20.3154 33.7319 19.6903 34.357C19.0652 34.9821 18.2173 35.3333 17.3333 35.3333H10.6666C9.78255 35.3333 8.9347 34.9821 8.30958 34.357C7.68446 33.7319 7.33327 32.884 7.33327 32V30.3333H20.6666Z"
                    fill="white"
                  />
                </svg>
              </div>
              <h3 className="font-bold text-lg text-emerald-300">Disrupting</h3>
              <p className="w-60 sm:w-40 md:w-48 lg:w-72 text-center text-lg">
                Learn To Love Growth And Change And You Will Be A Success
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-page mt-32">
        <BlockQuote
          value={
            <span>
              Engi is a gig economy for coders built on the blockchain. No need
              to apply. Write code,{' '}
              <span className="text-emerald-300">get paid instantly</span>.
            </span>
          }
        />
      </div>
    </div>
  );
}
