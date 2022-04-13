import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="flex min-h-full flex-col pt-16 pb-12">
      <main className="mx-auto flex w-full max-w-7xl flex-grow flex-col justify-center px-4 sm:px-6 lg:px-8">
        <div className="py-16">
          <div className="text-center">
            <p className="font-grifter text-sm uppercase tracking-wide text-emerald-300">
              404 error
            </p>
            <h1 className="mt-8 font-grifter text-4xl tracking-tight text-white sm:text-5xl">
              Page not found.
            </h1>
            <p className="mt-6 text-base text-gray-300">
              Sorry, we couldn't find the page you're looking for.
            </p>
            <div className="mt-6">
              <Link
                to="/"
                className="text-base font-medium text-emerald-300 hover:text-emerald-400"
              >
                Go back home<span aria-hidden="true"> &rarr;</span>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
