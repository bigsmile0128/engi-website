import { useState } from 'react';
import SettingsMenu from './SettingsMenu/SettingsMenu';
import { SETTINGS_LINKS, SETTINGS_TAB } from './Settings.utils';
import SettingsPanel from './SettingsPanel/SettingsPanel';

function SettingContainer() {
  const [selectedTab, setSelectedTab] = useState<SETTINGS_TAB>(
    SETTINGS_TAB.PERSONAL_INFO
  );

  const handleChange = (key: SETTINGS_TAB) => {
    console.log('selectedTab', key);
    setSelectedTab(key);
  };

  return (
    <div className="max-w-page my-24 flex flex-col gap-4">
      <h1 className="text-7xl font-bold">Settings</h1>
      <div className="flex justify-between">
        <div className="w-3/12">
          <SettingsMenu items={SETTINGS_LINKS} onChange={handleChange} />
        </div>
        <div className="w-8/12">
          <div className="bg-[#232323]/10 backdrop-blur-[100px]">
            <SettingsPanel selectedTab={selectedTab} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SettingContainer;
