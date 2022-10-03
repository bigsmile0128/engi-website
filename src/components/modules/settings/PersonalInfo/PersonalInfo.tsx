import { ChangeEvent, ReactNode, useState } from 'react';
import Tab from '~/components/global/Tab/Tab';
import cn from 'classnames';
import BusinessIcon from 'public/img/settings/business.svg';
import FreelancerIcon from 'public/img/settings/freelancer.svg';
import Input from '~/components/global/Input/Input';
import {
  PersonalInfoValues,
  personalInfoInitialValues,
  PERSONAL_INFO_FELID,
} from './PersonalInfo.utils';
import Button from '~/components/global/Button/Button';

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
  const [selectedTab, setSelectedTab] = useState<number>(0);
  const [formValues, setFormValues] = useState<PersonalInfoValues>(
    personalInfoInitialValues
  );

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

  const handleFormChange =
    (fieldName: string) => (event: ChangeEvent<HTMLInputElement>) => {
      setFormValues((prev) => ({
        ...prev,
        [fieldName]: event.target.value,
      }));
    };

  const handleSubmit = () => {};

  return (
    <div className="p-8">
      <h2 className="font-grifter font-bold text-3xl">
        Update your account info
      </h2>
      <h6 className="text-secondary mt-4">
        Help us personalize your job recommendations.
      </h6>
      <form>
        <fieldset>
          <label
            htmlFor="profession-tab"
            className="block font-bold text-xl mt-12 mb-3"
          >
            Are you a freelancer or business?
          </label>
          <Tab
            id="profession-tab"
            tabLabels={renderTabs()}
            onChange={handleTabChange}
            tabListClassname="gap-5 children:w-2/4"
          />
        </fieldset>
        <fieldset className="mt-12">
          <label className="block font-bold text-xl" htmlFor="account_name">
            Account name
          </label>
          <Input
            id="account_name"
            className="block w-full mt-4"
            type="text"
            placeholder="Enter your account name"
            value={formValues[PERSONAL_INFO_FELID.NAME]}
            onChange={handleFormChange(PERSONAL_INFO_FELID.NAME)}
          />
        </fieldset>
        <fieldset>
          <label className="block font-bold text-xl mt-6" htmlFor="nick_name">
            Preferred nickname
          </label>
          <Input
            id="nick_name"
            className="block w-full mt-4"
            type="text"
            placeholder="Add nickname"
            value={formValues[PERSONAL_INFO_FELID.NICKNAME]}
            onChange={handleFormChange(PERSONAL_INFO_FELID.NICKNAME)}
          />
        </fieldset>
        <fieldset>
          <label
            className="block font-bold text-xl mt-6"
            htmlFor="company_name"
          >
            Company name
          </label>
          <Input
            id="company_name"
            className="block w-full mt-4"
            type="text"
            placeholder="Enter your company name"
            value={formValues[PERSONAL_INFO_FELID.COMPANY_NAME]}
            onChange={handleFormChange(PERSONAL_INFO_FELID.COMPANY_NAME)}
          />
        </fieldset>
        <div className="text-center mt-9">
          <Button onClick={handleSubmit} variant="primary" className="w-2/5">
            Save
          </Button>
        </div>
      </form>
    </div>
  );
}

export default PersonalInfo;
