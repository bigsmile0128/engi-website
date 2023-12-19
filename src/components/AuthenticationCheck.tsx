import { getCurrentUser } from '~/app/(user)/api';
import AuthenticationFailed from './AuthenticationFailed';

export default async function AunthenticationCheck({
  children,
}: {
  children: any;
}) {
  const user = await getCurrentUser();

  if (!user) {
    return (
      <div className="w-full py-24 max-w-page flex items-center justify-center">
        <AuthenticationFailed text="Please log in." />
      </div>
    );
  }

  return children;
}
