import SettingsMenu from './SettingsMenu/SettingsMenu';
import { SETTINGS_LINKS } from './Settings.utils';

function SettingContainer() {
  return (
    <div className="max-w-page my-24 flex flex-col gap-4">
      <h1 className="text-7xl font-bold">Settings</h1>
      <div className="flex justify-between">
        <div className="w-3/12">
          <SettingsMenu items={SETTINGS_LINKS} />
        </div>
        <div className="w-8/12">right</div>
      </div>
    </div>
  );
}

export default SettingContainer;
