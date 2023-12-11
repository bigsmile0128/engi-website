import { getCurrentUser } from '~/app/(user)/api';
import { CurrentUserInfo } from '~/types';
import Navbar from './Navbar';

export default async function NavbarContainer() {
  let user: CurrentUserInfo | null = null;
  try {
    user = await getCurrentUser();
  } catch (error) {
    console.error(error);
  }
  return <Navbar user={user} />;
}
