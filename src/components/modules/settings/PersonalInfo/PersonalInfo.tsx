import { ReactNode, useState } from 'react';
import Tab from '~/components/global/Tab/Tab';
import cn from 'classnames';
import BusinessIcon from 'public/img/settings/business.svg';
import FreelancerIcon from 'public/img/settings/freelancer.svg';

interface ProfessionTabProps {
  image: ReactNode;
  title: string;
  selected?: boolean;
}

const tabData = [
  {
    image: <BusinessIcon width={34} height={34} />,
    title: 'Business',
  },
  {
    image: <FreelancerIcon width={34} height={34} />,
    title: 'Freelancer',
  },
];

function ProfessionTab({ image, title, selected }: ProfessionTabProps) {
  const rootClasses = cn(
    'p-6 border bg-[#161b28]/30',
    { 'border-green-primary text-green-primary': selected },
    { 'border-primary/60': !selected }
  );
  const imageWrapperClasses = cn('mb-9', {
    'children:children:fill-green-primary': selected,
  });

  return (
    <div className={rootClasses}>
      {!!image && <div className={imageWrapperClasses}>{image}</div>}
      <p className="font-grifter font-bold text-xl text-left">{title}</p>
    </div>
  );
}

function PersonalInfo() {
  const [selectedTab, setSelectedTab] = useState(-1);

  const handleTabChange = (value: number) => {
    setSelectedTab(value);
  };

  const renderTabs = () => {
    return tabData.map(({ image, title }, index) => {
      const isSelected = selectedTab === index;
      return (
        <ProfessionTab
          key={`tab_${index}`}
          image={image}
          title={title}
          selected={isSelected}
        />
      );
    });
  };

  return (
    <div className="p-8">
      <h2 className="font-grifter font-bold text-3xl">
        Update your account info
      </h2>
      <h6 className="text-secondary">
        Help us personalize your job recommendations.
      </h6>
      <Tab
        tabLabels={renderTabs()}
        onChange={handleTabChange}
        tabListClassname="gap-5 children:w-2/4"
      />
    </div>
  );
}

export default PersonalInfo;
