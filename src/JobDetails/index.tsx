import React, { useState } from 'react';
import classNames from 'classnames';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import axios, { AxiosError } from 'axios';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { HiOutlineChevronLeft } from 'react-icons/hi';
import { IoMdShareAlt } from 'react-icons/io';
import * as Sentry from '@sentry/react';

import PaymentInfo from './components/PaymentInfo';
import JobInfo from './components/JobInfo';

import Tag from '../components/Tag';
import JobCreatorInfo from './components/JobCreatorInfo';
import ShareModal from './components/ShareModal';

dayjs.extend(relativeTime);

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
  created: string;
};

export default function JobDetails() {
  const [modalOpen, setModalOpen] = useState(false);
  const { id } = useParams();
  const { isLoading, isError, data } = useQuery<Job>(
    ['jobDetails', id],
    async () => {
      const response = await axios.get(`/api/jobs/${id}`);
      return response.data;
    },
    {
      onError: (error: AxiosError) => {
        Sentry.captureException(error, (scope) => {
          scope.clear();
          scope.setTransactionName('GET /jobs/{id}');
          scope.setTag(id, 'id'.toString());
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
      <ShareModal open={modalOpen} setOpen={setModalOpen} />
      <div className="flex flex-1 flex-col">
        <div className="flex items-center">
          <Link to="/jobs" className="">
            <HiOutlineChevronLeft className="h-6 w-6" />
          </Link>
          <h1
            className={classNames(
              'font-grifter text-3xl px-4',
              isLoading ? `skeleton animate-pulse mx-2` : ''
            )}
          >
            <span className="whitespace-nowrap -mb-2 block">
              {data?.title ?? 'Placeholder'}
            </span>
          </h1>
          <button className="" onClick={() => setModalOpen(true)}>
            <IoMdShareAlt className="h-6 w-6" />
          </button>
        </div>
        <div className="flex items-center mt-12 gap-x-4">
          {isLoading ? (
            <Tag className="!py-2 skeleton border-transparent">
              <span>Placeholder</span>
            </Tag>
          ) : (
            <>
              <Tag className="gap-x-2 !py-2">
                <svg width="16" height="22" viewBox="0 0 16 22" fill="none">
                  <path
                    d="M7.99985 22C9.98897 22 11.8966 21.2098 13.3032 19.8033C14.7097 18.3968 15.4999 16.4891 15.4999 14.5C15.4999 13.634 15.2699 12.803 14.9999 12.03C13.3329 13.677 12.0668 14.5 11.1999 14.5C15.1948 7.5 12.9998 4.5 6.99985 0.5C7.49985 5.5 4.20385 7.774 2.86185 9.037C1.76718 10.0667 1.00709 11.4015 0.680133 12.8683C0.353179 14.3352 0.474441 15.8664 1.0282 17.2635C1.58195 18.6606 2.54266 19.8592 3.78576 20.7037C5.02885 21.5483 6.497 21.9999 7.99985 22ZM8.70985 4.235C11.9509 6.985 11.9669 9.122 9.46285 13.509C8.70185 14.842 9.66485 16.5 11.1999 16.5C11.8878 16.5 12.5839 16.3 13.3189 15.905C13.101 16.728 12.6951 17.4892 12.133 18.1286C11.571 18.768 10.8682 19.2682 10.0799 19.5899C9.29169 19.9115 8.43955 20.0458 7.59061 19.9821C6.74166 19.9184 5.91909 19.6585 5.18765 19.2229C4.45622 18.7873 3.8359 18.1878 3.37553 17.4717C2.91517 16.7556 2.62732 15.9424 2.53467 15.0961C2.44201 14.2498 2.54708 13.3936 2.84158 12.5948C3.13609 11.7961 3.61201 11.0766 4.23185 10.493C4.35785 10.375 4.99685 9.808 5.02485 9.783C5.44885 9.403 5.79785 9.066 6.14285 8.697C7.37285 7.379 8.25685 5.917 8.70885 4.235H8.70985Z"
                    fill="#F27B50"
                  />
                </svg>
                <span>Top activity</span>
              </Tag>
              <Tag className="gap-x-2 !py-2">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M22.621 12.5022C22.621 11.0888 20.8273 9.74939 18.0773 8.91876C18.7119 6.15291 18.4299 3.9524 17.187 3.24789C16.9006 3.08263 16.5657 3.00435 16.1999 3.00435V3.97414C16.4026 3.97414 16.5657 4.01328 16.7023 4.08721C17.3017 4.42642 17.5617 5.71802 17.3589 7.37927C17.3105 7.78807 17.2312 8.2186 17.1342 8.65783C16.2704 8.44909 15.3273 8.28819 14.3357 8.18381C13.7408 7.37927 13.1238 6.64867 12.5024 6.0094C13.9391 4.6917 15.2877 3.96979 16.2043 3.96979V3C14.9923 3 13.4058 3.85237 11.8017 5.33097C10.1975 3.86107 8.61099 3.0174 7.39908 3.0174V3.98718C8.31131 3.98718 9.66425 4.70475 11.101 6.01374C10.484 6.65302 9.86696 7.37927 9.28081 8.18381C8.28481 8.28819 7.34172 8.44909 6.47797 8.66218C6.37656 8.2273 6.30167 7.80546 6.24875 7.40102C6.04171 5.73977 6.29724 4.44816 6.89225 4.10461C7.02441 4.02632 7.19627 3.99154 7.39908 3.99154V3.02174C7.02884 3.02174 6.69388 3.10003 6.40307 3.26528C5.16465 3.96979 4.88704 6.16595 5.52601 8.92311C2.78485 9.75809 1 11.0932 1 12.5022C1 13.9156 2.79366 15.255 5.54365 16.0856C4.90902 18.8515 5.19106 21.052 6.43392 21.7565C6.72039 21.9217 7.05525 22 7.42549 22C8.6374 22 10.224 21.1477 11.8281 19.6691C13.4323 21.139 15.0188 21.9827 16.2308 21.9827C16.6009 21.9827 16.9359 21.9044 17.2268 21.7391C18.4651 21.0346 18.7428 18.8384 18.1037 16.0813C20.8361 15.2507 22.621 13.9112 22.621 12.5022ZM16.883 9.60153C16.7199 10.1626 16.5172 10.7409 16.288 11.3193C16.1074 10.9714 15.9179 10.6235 15.7107 10.2756C15.508 9.92769 15.292 9.58849 15.0761 9.25797C15.7019 9.34929 16.3057 9.46237 16.883 9.60153ZM14.8645 14.233C14.5208 14.8202 14.1683 15.3768 13.8025 15.8943C13.1458 15.9508 12.4804 15.9813 11.8105 15.9813C11.145 15.9813 10.4795 15.9508 9.82734 15.8986C9.46154 15.3811 9.10451 14.8288 8.76078 14.246C8.42583 13.6764 8.12181 13.098 7.84411 12.5153C8.11738 11.9325 8.42583 11.3497 8.75645 10.7801C9.10017 10.193 9.45267 9.63632 9.81848 9.11881C10.4752 9.06227 11.1406 9.03183 11.8105 9.03183C12.476 9.03183 13.1414 9.06227 13.7936 9.11446C14.1594 9.63197 14.5165 10.1843 14.8602 10.767C15.1951 11.3367 15.4992 11.9151 15.7769 12.4979C15.4992 13.0806 15.1951 13.6634 14.8645 14.233ZM16.288 13.6677C16.5194 14.2345 16.7223 14.8121 16.8962 15.3985C16.3189 15.5376 15.7107 15.6551 15.0805 15.7464C15.2964 15.4116 15.5124 15.068 15.7152 14.7157C15.9179 14.3679 16.1074 14.0156 16.288 13.6677ZM11.8193 18.3079C11.4094 17.8904 10.9995 17.4251 10.5941 16.9163C10.9908 16.9337 11.3962 16.9467 11.806 16.9467C12.2203 16.9467 12.6302 16.9381 13.0313 16.9163C12.653 17.4014 12.2484 17.8659 11.8193 18.3079ZM8.54043 15.7464C7.91467 15.6551 7.31088 15.542 6.7336 15.4029C6.89659 14.8419 7.0994 14.2634 7.32852 13.685C7.50925 14.033 7.69875 14.3809 7.9058 14.7288C8.11294 15.0767 8.32452 15.4159 8.54043 15.7464ZM11.7973 6.69651C12.2071 7.11399 12.617 7.57932 13.0224 8.08813C12.6258 8.07074 12.2203 8.0577 11.8105 8.0577C11.3962 8.0577 10.9863 8.06639 10.5854 8.08813C10.9636 7.60305 11.3682 7.1385 11.7973 6.69651ZM8.536 9.25797C8.32009 9.59283 8.10417 9.93639 7.90146 10.2886C7.69875 10.6365 7.50925 10.9845 7.32852 11.3323C7.09715 10.7656 6.8942 10.188 6.72039 9.60153C7.29767 9.46672 7.9058 9.34929 8.536 9.25797ZM4.54765 14.7027C2.98758 14.046 1.97836 13.185 1.97836 12.5022C1.97836 11.8194 2.98758 10.954 4.54765 10.3017C4.92666 10.1408 5.34095 9.99727 5.76844 9.86246C6.01963 10.7148 6.35015 11.602 6.76001 12.5109C6.35459 13.4155 6.0284 14.2983 5.78164 15.1463C5.34538 15.0115 4.93109 14.8636 4.54765 14.7027ZM6.91866 20.9172C6.31931 20.578 6.05925 19.2864 6.26205 17.6251C6.31054 17.2164 6.38977 16.7858 6.48674 16.3465C7.35059 16.5553 8.29368 16.7162 9.28524 16.8206C9.88017 17.6251 10.4972 18.3557 11.1186 18.995C9.68189 20.3127 8.33329 21.0346 7.41662 21.0346C7.21834 21.0303 7.05091 20.9911 6.91866 20.9172ZM17.3722 17.6034C17.5793 19.2646 17.3237 20.5562 16.7287 20.8998C16.5966 20.9781 16.4247 21.0129 16.2219 21.0129C15.3096 21.0129 13.9567 20.2953 12.52 18.9863C13.137 18.347 13.754 17.6208 14.3402 16.8162C15.3362 16.7119 16.2792 16.5509 17.143 16.3379C17.2444 16.7771 17.3237 17.199 17.3722 17.6034ZM19.0689 14.7027C18.6899 14.8636 18.2756 15.0072 17.8481 15.142C17.5969 14.2896 17.2664 13.4024 16.8565 12.4935C17.262 11.5889 17.5881 10.7062 17.8349 9.8581C18.2712 9.99292 18.6854 10.1408 19.0733 10.3017C20.6334 10.9583 21.6426 11.8194 21.6426 12.5022C21.6382 13.185 20.629 14.0504 19.0689 14.7027Z"
                    fill="#65FEB7"
                    stroke="#65FEB7"
                    strokeWidth="0.3"
                  />
                  <path
                    d="M11.8539 14.7281C12.9653 14.7281 13.8662 13.8288 13.8662 12.7194C13.8662 11.6102 12.9653 10.7109 11.8539 10.7109C10.7427 10.7109 9.8418 11.6102 9.8418 12.7194C9.8418 13.8288 10.7427 14.7281 11.8539 14.7281Z"
                    fill="#65FEB7"
                  />
                </svg>
                <span>React</span>
              </Tag>
            </>
          )}
        </div>
        <p
          className={classNames(
            'text-gray-400 mt-6 self-start',
            isLoading ? 'skeleton' : ''
          )}
        >
          <span>
            {isLoading ? 'Placeholder date' : dayjs(data?.created).fromNow()}
          </span>
        </p>
        <div className="mt-6 mb-10 w-full border-t border-gray-400 opacity-50" />
        <h2
          className={classNames(
            'font-grifter text-2xl self-start',
            isLoading ? 'skeleton' : ''
          )}
        >
          Job Description
        </h2>
        <div className="mt-6 mb-12 text-gray-300">
          <div
            className={classNames(
              'flex flex-col gap-y-1',
              isLoading ? '' : 'hidden'
            )}
          >
            <div className={`skeleton animate-pulse h-5 w-5/5`} />
            <div className={`skeleton animate-pulse h-5 w-3/5`} />
            <div className={`skeleton animate-pulse h-5 w-4/5`} />
            <div className={`skeleton animate-pulse h-5 w-3/5`} />
          </div>
          <span className={isLoading ? 'hidden' : ''}>{data?.description}</span>
        </div>
        <div className="flex flex-col md:flex-row md:items-center gap-x-6 gap-y-6">
          <PaymentInfo
            className="md:flex-1 lg:flex-initial"
            isLoading={isLoading}
          />
          <JobInfo
            className="md:flex-1 lg:flex-initial"
            isLoading={isLoading}
          />
        </div>
      </div>
      <JobCreatorInfo
        className="shrink-0 mt-6 lg:mt-0 w-full md:w-96 lg:w-auto lg:basis-80"
        isLoading={isLoading}
      />
    </div>
  );
}
