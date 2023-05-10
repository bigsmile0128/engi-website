import { useState } from 'react';
import Button from '~/components/global/Button/Button';

function BitPreference() {
  const [selectedLangs] = useState<Array<number>>([]);

  const handleSave = () => {};
  const disableSave =
    !selectedLangs || (!!selectedLangs && selectedLangs.length <= 0);

  return (
    <div className="p-8">
      <h2 className="font-grifter font-bold text-xl hidden md:block">
        Bit Preference
      </h2>
      <h6 className="text-secondary mt-4 hidden md:block">
        Help us personalize your bit recommendations.
      </h6>
      <div className="text-right mt-20">
        <Button
          onClick={handleSave}
          variant="primary"
          className="w-2/5 mr-6"
          disabled={disableSave}
        >
          Save Changes
        </Button>
        <Button
          onClick={() => {}}
          variant="default"
          className="w-1/5"
          disabled={disableSave}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
}

export default BitPreference;
