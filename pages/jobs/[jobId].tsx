import React, { useState } from 'react';
import classNames from 'classnames';
import Link from 'next/link';
import { useQuery } from 'react-query';
import axios, { AxiosError } from 'axios';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { HiOutlineChevronLeft } from '@react-icons/all-files/hi/HiOutlineChevronLeft';
import { IoMdShareAlt } from '@react-icons/all-files/io/IoMdShareAlt';
import * as Sentry from '@sentry/react';

import PaymentInfo from 'components/jobDetails/PaymentInfo';
import JobInfo from 'components/jobDetails/JobInfo';

import Tag from 'components/Tag';
import JobCreatorInfo from 'components/jobDetails/JobCreatorInfo';
import { useRouter } from 'next/router';
import { Job } from 'types';
import JobHeader from 'components/jobDetails/JobHeader';
import JobDescription from 'components/jobDetails/JobDescription';

dayjs.extend(relativeTime);

export default function JobDetails(props) {
  const router = useRouter();
  const { jobId } = router.query;
  const { isLoading, isError, data } = useQuery<Job>(
    ['jobDetails', jobId],
    () => fetchJobDetails(jobId),
    {
      onError: (error: AxiosError) => {
        Sentry.captureException(error, (scope) => {
          scope.clear();
          scope.setTransactionName('GET /jobs/{jobId}');
          scope.setTag('jobId', jobId.toString());
          return scope;
        });
      },
    }
  );

  return isError ? (
    <div className="flex flex-col items-center justify-center py-24">
      <p className="font-grifter text-3xl text-center">
        Something went wrong...
      </p>
    </div>
  ) : (
    <div className="max-w-7xl mx-auto p-8 sm:p-16 md:p-24 flex flex-col lg:flex-row items-start gap-x-12">
      <div className="flex flex-1 flex-col">
        <JobHeader isLoading={isLoading} job={data} />
        <JobDescription className="mt-8" isLoading={isLoading} job={data} />
      </div>
      <JobCreatorInfo
        className="shrink-0 mt-6 lg:mt-0 w-full md:w-96 lg:w-auto lg:basis-80"
        isLoading={isLoading}
      />
    </div>
  );
}

async function fetchJobDetails(jobId) {
  const response = await axios.get(`/api/jobs/${jobId}`);
  return response.data;
}
