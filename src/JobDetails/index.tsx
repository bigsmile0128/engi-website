import React from 'react';
import classNames from 'classnames';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import axios from 'axios';

type Job = {
  language: string;
  title: string;
  description: string;
  numTests: number;
  testsPassed: number;
  timeEstimate: number;
  reward: number;
  numContributors: number;
  id: string;
};

export default function JobDetails() {
  const { id } = useParams();
  const { isLoading, error, data } = useQuery<Job>('jobDetails', async () => {
    const response = await axios.get(`/api/jobs/${id}`);
    return response.data;
  });

  return (
    <div className="max-w-7xl mx-auto flex flex-col p-8 sm:p-16 md:p-24">
      JOB DETAILS
    </div>
  );
}
