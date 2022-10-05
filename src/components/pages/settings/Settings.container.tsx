import { useState, Fragment } from 'react';
import SettingsMenu from './SettingsMenu/SettingsMenu';
import { SETTINGS_LINKS, SETTINGS_TAB } from './Settings.utils';
import SettingsPanel from './SettingsPanel/SettingsPanel';
import { Dialog, Transition } from '@headlessui/react';
import { XIcon } from '@heroicons/react/outline';

function SettingContainer() {
  const [selectedTab, setSelectedTab] = useState<SETTINGS_TAB>(
    SETTINGS_TAB.PERSONAL_INFO
  );
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleChange = (key: SETTINGS_TAB) => {
    setSelectedTab(key);
  };

  const renderForNonMobile = () => (
    <div className="hidden max-w-page my-24 md:flex flex-col gap-4">
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

  const renderForMobile = () => (
    <div>
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-40 md:hidden"
          onClose={setSidebarOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
          </Transition.Child>
          <div className="fixed inset-0 z-40 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative flex w-full max-w-xs flex-1 flex-col bg-indigo-700 pt-5 pb-4">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute top-0 right-0 -mr-12 pt-2">
                    <button
                      type="button"
                      className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                      onClick={() => setSidebarOpen(false)}
                    >
                      <span className="sr-only">Close sidebar</span>
                      <XIcon
                        className="h-6 w-6 text-white"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </Transition.Child>
                <div className="mt-5 h-0 flex-1 overflow-y-auto">
                  <nav className="space-y-1 px-2">
                    {/* {navigation.map((item) => (
                        <a
                          key={item.name}
                          href={item.href}
                          className={classNames(
                            item.current ? 'bg-indigo-800 text-white' : 'text-indigo-100 hover:bg-indigo-600',
                            'group flex items-center px-2 py-2 text-base font-medium rounded-md'
                          )}
                        >
                          <item.icon className="mr-4 h-6 w-6 flex-shrink-0 text-indigo-300" aria-hidden="true" />
                          {item.name}
                        </a>
                      ))} */}
                  </nav>
                </div>
              </Dialog.Panel>
            </Transition.Child>
            <div className="w-14 flex-shrink-0" aria-hidden="true">
              {/* Dummy element to force sidebar to shrink to fit close icon */}
            </div>
          </div>
        </Dialog>
      </Transition.Root>
      <div>Menu</div>
      <div>
        <SettingsPanel selectedTab={selectedTab} />
      </div>
    </div>
  );

  return (
    <>
      {renderForNonMobile()}
      {renderForMobile()}
    </>
  );
}

export default SettingContainer;
