import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import SocialMedia from '~/components/modules/layout/SocialMedia';
import Button from '~/components/global/Button/Button';
import { useMutation } from 'react-query';
import axios, { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { SENDGRID_LIST_NAME } from '~/types';

interface ContactUsPageProps {
  className?: string;
}

export default function ContactUsPage({ className }: ContactUsPageProps) {
  const emailMutation = useMutation<any, AxiosError, any>(
    async ({ firstName, lastName, email, subject, message }: any) => {
      await axios.put('/api/contact-us', {
        contact_list_name: SENDGRID_LIST_NAME.CONTACT_US,
        first_name: firstName,
        last_name: lastName,
        email,
        subject,
        message,
      });
    }
  );

  const [formData, setFormData] = useState<Record<string, string>>({
    firstName: '',
    lastName: '',
    email: '',
    subject: '',
    message: '',
  });

  useEffect(() => {
    if (emailMutation.isSuccess) {
      toast.success('Successfully sent email.', { position: 'bottom-right' });
    }
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      subject: '',
      message: '',
    });
  }, [emailMutation.isSuccess]);

  useEffect(() => {
    if (emailMutation.isError) {
      toast.error('Failed to send email.', { position: 'bottom-right' });
    }
  }, [emailMutation.isError]);

  return (
    <div
      className={classNames(
        'max-w-page flex flex-col md:flex-row gap-16 my-32',
        className
      )}
    >
      <div className="basis-1/2 lg:basis-3/5 flex flex-col">
        <h1 className="font-grifter text-4xl lg:text-5xl">
          Questions about{' '}
          <span className="inline-block relative text-gray-700 px-2">
            <div className="absolute w-full h-full scale-y-110 inset-0 -mt-1 bg-green-primary z-0" />
            <span className="relative z-10">Engi</span>
          </span>
          ?
        </h1>
        <p className="mt-12">
          Whether you’re a business looking to accelerate your software team or
          a freelance programmer looking to work flexibly from anywhere in the
          world, Engi is the platform for you. We’re happy to answer your
          questions - don’t be shy!
        </p>
        <div className="h-[1px] w-3/4 md:w-1/2 bg-white/30 my-16" />
        <p className="">
          Miami, Florida, 33131
          <br />
          <br />
          (555) 555-5555
          <br />
          contact@engi.network
        </p>
        <SocialMedia className="mt-12" />
      </div>
      <form
        className="md:basis-1/2 lg:basis-2/5 flex-1 flex flex-col gap-y-6"
        onSubmit={(e) => {
          e.preventDefault();
          const fieldsToVerify = [
            { label: 'First Name', key: 'firstName' },
            { label: 'Last Name', key: 'lastName' },
            { label: 'Email', key: 'email' },
            { label: 'Subject', key: 'subject' },
            { label: 'Message', key: 'message' },
          ];
          const missingFields = fieldsToVerify
            .filter(({ label, key }) => !formData[key])
            .map((field) => field.label);
          if (missingFields.length > 0) {
            toast.error(
              `Some fields are missing: ${missingFields.join(', ')}.`,
              { position: 'bottom-right' }
            );
          } else {
            emailMutation.mutate(formData);
          }
        }}
      >
        <div className="flex gap-x-4">
          <div className="flex flex-col gap-y-2">
            <label htmlFor="firstName" className="font-bold text-lg">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              placeholder="First Name"
              className="w-full border border-gray-400 p-4 text-white placeholder:text-gray-300 outline-none focus-visible:ring-1 bg-transparent"
              value={formData?.firstName ?? ''}
              onChange={(e) =>
                setFormData({ ...formData, firstName: e.target.value })
              }
            />
          </div>
          <div className="flex flex-col gap-y-2">
            <label htmlFor="lastName" className="font-bold text-lg">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              placeholder="Last Name"
              className="w-full border border-gray-400 p-4 text-white placeholder:text-gray-300 outline-none focus-visible:ring-1 bg-transparent"
              value={formData?.lastName ?? ''}
              onChange={(e) =>
                setFormData({ ...formData, lastName: e.target.value })
              }
            />
          </div>
        </div>
        <div className="flex flex-col gap-y-2">
          <label htmlFor="email" className="font-bold text-lg">
            Email
          </label>
          <input
            type="text"
            id="email"
            placeholder="Email"
            className="w-full border border-gray-400 p-4 text-white placeholder:text-gray-300 outline-none focus-visible:ring-1 bg-transparent"
            value={formData?.email ?? ''}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
        </div>
        <div className="flex flex-col gap-y-2">
          <label htmlFor="subject" className="font-bold text-lg">
            Subject
          </label>
          <input
            type="text"
            id="subject"
            placeholder="Subject"
            className="w-full border border-gray-400 p-4 text-white placeholder:text-gray-300 outline-none focus-visible:ring-1 bg-transparent"
            value={formData?.subject ?? ''}
            onChange={(e) =>
              setFormData({ ...formData, subject: e.target.value })
            }
          />
        </div>
        <div className="flex flex-col gap-y-2">
          <label htmlFor="message" className="font-bold text-lg">
            Message
          </label>
          <textarea
            id="message"
            placeholder="Message"
            className="w-full border border-gray-400 p-4 text-white placeholder:text-gray-300 outline-none focus-visible:ring-1 bg-transparent"
            value={formData?.message ?? ''}
            onChange={(e) =>
              setFormData({ ...formData, message: e.target.value })
            }
          />
        </div>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
}
