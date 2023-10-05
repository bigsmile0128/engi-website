import { getCurrentUser } from '~/app/(user)/api';
import Navbar from './Navbar';

export default async function NavbarContainer() {
  const user = await getCurrentUser();
  return <Navbar user={user} />;
}
