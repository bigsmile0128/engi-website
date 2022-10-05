import { useState } from 'react';
import Switch from '~/components/global/Switch/Switch';

enum NOTIFICATION_FIELDS {
  NEW_JOBS = 'new_jobs',
  NEWS_LETTER = 'newsLetter',
  TECH_UPDATES = 'tech_updates',
}

interface FormValues {
  [NOTIFICATION_FIELDS.NEWS_LETTER]: boolean;
  [NOTIFICATION_FIELDS.NEW_JOBS]: boolean;
  [NOTIFICATION_FIELDS.TECH_UPDATES]: boolean;
}

const initialValues: FormValues = {
  [NOTIFICATION_FIELDS.NEWS_LETTER]: false,
  [NOTIFICATION_FIELDS.NEW_JOBS]: false,
  [NOTIFICATION_FIELDS.TECH_UPDATES]: false,
};

function Notifications() {
  const [values, setValues] = useState<FormValues>(initialValues);

  const handleValueChange = (fieldName: string) => (value: boolean) => {
    setValues((prev) => ({ ...prev, [fieldName]: value }));
  };

  return (
    <div className="p-8">
      <h5 className="text-xl font-bold hidden md:block">
        Notification Settings
      </h5>
      <p className="text-secondary mt-4 hidden md:block">
        Do you want to receive the following notifications?
      </p>
      <h5 className="text-xl font-bold mb-4 md:mt-8">Email updates</h5>
      <div className="flex flex-col gap-8">
        <label className="flex justify-between ">
          <span className="text-xl">Weekly newsletter</span>
          <Switch
            checked={values[NOTIFICATION_FIELDS.NEWS_LETTER]}
            onChange={handleValueChange(NOTIFICATION_FIELDS.NEWS_LETTER)}
          />
        </label>
        <label className="flex justify-between ">
          <span className="text-xl">New jobs</span>
          <Switch
            checked={values[NOTIFICATION_FIELDS.NEW_JOBS]}
            onChange={handleValueChange(NOTIFICATION_FIELDS.NEW_JOBS)}
          />
        </label>
        <label className="flex justify-between ">
          <span className="text-xl">Technical updates</span>
          <Switch
            checked={values[NOTIFICATION_FIELDS.TECH_UPDATES]}
            onChange={handleValueChange(NOTIFICATION_FIELDS.TECH_UPDATES)}
          />
        </label>
      </div>
    </div>
  );
}

export default Notifications;
