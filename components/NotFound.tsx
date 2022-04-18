import React from 'react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-full pt-16 pb-12 flex flex-col">
      <main className="flex-grow flex flex-col justify-center max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-16">
          <div className="text-center">
            <p className="text-sm font-grifter text-emerald-300 uppercase tracking-wide">
              404 error
            </p>
            <h1 className="mt-8 text-4xl font-grifter text-white tracking-tight sm:text-5xl">
              Page not found.
            </h1>
            <p className="mt-6 text-base text-gray-300">
              Sorry, we couldn&apos;t find the page you&apos;re looking for.
            </p>
            <div className="mt-6">
              <Link href="/" passHref>
                <a className="text-base font-medium text-emerald-300 hover:text-emerald-400">
                  Go back home<span aria-hidden="true"> &rarr;</span>
                </a>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
