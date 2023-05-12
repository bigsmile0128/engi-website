import classNames from 'classnames';
import { RiGithubFill } from 'react-icons/ri';

type UserRepositoriesProps = {
  className?: string;
};

export default function UserRepositories({ className }: UserRepositoriesProps) {
  return (
    <div
      className={classNames(
        'flex flex-col items-start gap-y-8',
        'bg-secondary/10 backdrop-blur-[100px] p-8',
        className
      )}
    >
      <span className="font-bold text-2xl">About</span>
      <div>
        <span className="font-medium text-xl">Github username</span>
        <div className="mt-4 flex items-center gap-2">
          <RiGithubFill className="h-6 w-6" />
          <span className="font-medium text-secondary">polkadot</span>
        </div>
      </div>
      <div>
        <span className="font-medium text-xl">Authorized repositories</span>
        <div className="mt-4 flex items-center gap-2">
          <RiGithubFill className="h-6 w-6" />
          <span className="font-medium text-secondary">@polkadot/website</span>
        </div>
      </div>
    </div>
  );
}
