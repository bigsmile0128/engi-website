import { getCurrentUser } from '~/app/(user)/api';
import NewDraft from './NewDraft';
import { redirect } from 'next/navigation';

export default async function NewDraftContainer() {
  const user = await getCurrentUser();
  if (!user) {
    redirect('/login');
  }

  return <NewDraft walletId={user.wallet.Id} />;
}
