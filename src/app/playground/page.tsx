'use client';

import SignInWithLocalWallets from '~/components/pages/signup/SignInWithLocalWallets';

export default function Playground() {
  // const signatureMutation = useSignature();

  return (
    <div className="max-w-page my-24">
      <SignInWithLocalWallets className="w-full" />
    </div>
  );
}
