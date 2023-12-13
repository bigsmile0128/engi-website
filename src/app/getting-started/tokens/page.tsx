import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getCurrentUser } from '~/app/(user)/api';
import BuyEngi from '~/components/BuyEngi';
import Button from '~/components/global/Button/Button';

export default async function GettingStartedTokens() {
  const user = await getCurrentUser();
  if (!user) {
    redirect('/login');
  }

  return (
    <div className="w-full max-w-page flex flex-col items-center py-24 text-center">
      <h1 className="mt-8 font-grifter text-4xl">
        Add ENGI to create your first bounty!
      </h1>
      <p className="mt-4 text-xl text-secondary max-w-md">
        In order to create a bounty, you&apos;ll need to add ENGI. You can
        always add more later in your account page.
      </p>
      <BuyEngi className="mt-8 w-full max-w-md" walletId={user.wallet.Id} />
    </div>
  );
}
