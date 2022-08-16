import React, { useState } from 'react';
import classNames from 'classnames';
import { useQuery } from 'react-query';
import axios, { AxiosError } from 'axios';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import * as Sentry from '@sentry/react';

import { useRouter } from 'next/router';
import { Job } from 'types';
import JobHeader from 'components/jobDetails/JobHeader';
import JobDescription from 'components/jobDetails/JobDescription';
import JobActivity from 'components/jobDetails/JobActivity';

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
    <div className="max-w-page mt-12 mb-24 flex flex-col lg:flex-row gap-16">
      <div className="flex flex-1 flex-col">
        <JobHeader isLoading={isLoading} job={data} />
        <JobDescription className="mt-8" isLoading={isLoading} job={data} />
      </div>
      <JobActivity
        className="lg:basis-[400px] xl:basis-[430px]"
        isLoading={isLoading}
      />
    </div>
  );
}

async function fetchJobDetails(jobId) {
  const response = await axios.get(`/api/jobs/${jobId}`);
  return response.data;
}
