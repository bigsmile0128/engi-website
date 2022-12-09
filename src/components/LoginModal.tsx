import { Dialog } from '@headlessui/react';
import Modal from './global/Modal/Modal';
import SignInWithLocalWallets from './pages/signup/SignInWithLocalWallets';

type LoginModalProps = {
  onSuccess: () => void;
};

export default function LoginModal({ onSuccess }: LoginModalProps) {
  return (
    <Modal isOpen={true}>
      <Dialog.Title as="h3" className="font-grifter text-3xl text-gray-300">
        Log In
      </Dialog.Title>
      <p className="font-medium text-lg text-secondary mt-4">
        Select an account to log in.
      </p>
      <SignInWithLocalWallets className="mt-8" onSuccess={onSuccess} />
    </Modal>
  );
}
