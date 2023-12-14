import { redirect } from 'next/navigation';
import { getCurrentUser } from '../(user)/api';
import EngiText from '~/components/global/icons/EngiText';
import Personalization from './Personalization';
import Button from '~/components/global/Button/Button';
import Link from 'next/link';

export default async function GettingStarted() {
  const user = await getCurrentUser();
  if (!user) {
    redirect('/login');
  }

  return (
    <div className="w-full max-w-page flex flex-col items-center py-24 text-center">
      <EngiText className="h-auto w-36 mb-12" />
      <h1 className="mt-8 font-grifter text-4xl">
        Personalize your experience
      </h1>
      <p className="mt-4 text-xl text-secondary max-w-md">
        Tell us about your role. This will help us provide a tailored
        experience.
      </p>
      <Personalization
        className="mt-12 w-full max-w-md"
        currentUserType={user.userType}
        refreshOnSuccess
      />
      <Link
        href={
          user.userType === 'BUSINESS' ? '/getting-started/github' : '/bounties'
        }
        className="w-full max-w-md"
      >
        <Button variant="primary" className="mt-12 w-full">
          Continue
        </Button>
      </Link>
    </div>
  );
}
