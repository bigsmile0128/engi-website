import Link from 'next/link';
import { RiGithubFill } from 'react-icons/ri';
import Button from '~/components/global/Button/Button';
import EngiText from '~/components/global/icons/EngiText';
import { GITHUB_APP_LINK } from '~/utils/links';

export default async function GettingStartedGitHub() {
  return (
    <div className="w-full max-w-page flex flex-col items-center py-24 text-center">
      <EngiText className="h-auto w-36 mb-12" />
      <h1 className="mt-8 font-grifter text-4xl">Authorize on GitHub</h1>
      <p className="mt-4 text-xl text-secondary max-w-md">
        In order to start creating bounties, you must authorize the Engi GitHub
        app to have access to your repositories. You can always change or remove
        it in your settings.
      </p>
      <RiGithubFill className="mt-8 text-green-primary h-32 w-auto" />
      <div className="w-full max-w-md flex items-center gap-2">
        <Link href="/getting-started/tokens" className="w-full max-w-md">
          <Button variant="default" className="mt-12 w-full">
            Skip
          </Button>
        </Link>
        <Link href={GITHUB_APP_LINK} className="w-full max-w-md">
          <Button variant="primary" className="mt-12 w-full">
            Authorize
          </Button>
        </Link>
      </div>
    </div>
  );
}
