import { ReactNode } from 'react';
import Select from '~/components/global/Select/Select';
import JavaScriptIcon from 'public/img/settings/javascript.svg';

type SelectItem = {
  icon: ReactNode;
  title: string;
};

const itemData: SelectItem[] = [
  {
    icon: <JavaScriptIcon width={33} height={33} />,
    title: 'Javascript',
  },
  {
    icon: <JavaScriptIcon width={33} height={33} />,
    title: 'Javascript',
  },
  {
    icon: <JavaScriptIcon width={33} height={33} />,
    title: 'Javascript',
  },
  {
    icon: <JavaScriptIcon width={33} height={33} />,
    title: 'Javascript',
  },
  {
    icon: <JavaScriptIcon width={33} height={33} />,
    title: 'Javascript',
  },
  {
    icon: <JavaScriptIcon width={33} height={33} />,
    title: 'Javascript',
  },
  {
    icon: <JavaScriptIcon width={33} height={33} />,
    title: 'Javascript',
  },
];

function JobPreference() {
  const renderItems = () => {
    return itemData.map(({ icon, title }) => (
      <div
        key={title}
        className="flex justify-between items-center border border-white/20 px-4 py-3"
      >
        <div>{icon}</div>
        <div className="text-xl">{title}</div>
      </div>
    ));
  };
  return (
    <div className="p-8">
      <h2 className="font-grifter font-bold text-3xl">
        What languages does your company use?{' '}
      </h2>
      <h6 className="text-secondary">
        Help us personalize your job recommendations.
      </h6>
      <Select items={renderItems()} onSelect={() => {}} multi />
    </div>
  );
}

export default JobPreference;
