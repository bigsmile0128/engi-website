import classNames from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import connectedImg from 'public/img/signup/connected.png';
import Button from '~/components/global/Button/Button';

export default function Success() {
  return (
    <div
      className={classNames(
        'max-w-page mt-16 mb-24 flex flex-col items-center text-center'
      )}
    >
      <p className="font-grifter text-3xl mt-8">
        You&apos;ve successfully connected your wallet!
      </p>
      <p className="font-bold text-xl text-secondary mt-8">
        You&apos;re ready to start working on bounties or buy your first ENGI.
      </p>
      <Image className="mt-12 h-96 w-auto" src={connectedImg} alt="success" />

      <div className="mt-12 flex items-center justify-center gap-8">
        <Link href="/account" className="flex-1">
          <Button className="w-[240px]">Go to my account</Button>
        </Link>
        <Link href="/bits" className="flex-1">
          <Button className="w-[240px]" variant="primary">
            Browse Bounties
          </Button>
        </Link>
      </div>
    </div>
  );
}
