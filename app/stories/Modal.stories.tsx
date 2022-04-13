import React, { useState } from 'react';
import { XIcon } from '@heroicons/react/outline';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Button from '~/components/Button';
import Modal from '~/components/Modal';

export default {
  title: 'Modal',
  component: Modal,
} as ComponentMeta<typeof Modal>;

const Template: ComponentStory<typeof Modal> = (args) => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setModalOpen(true)}>Open Modal</Button>
      <Modal open={modalOpen} setOpen={setModalOpen}>
        <div className="text-white">
          <div className="flex items-center justify-between">
            <h1 className="-mb-2 font-grifter text-3xl">Header</h1>
            <button
              type="button"
              className="rounded-md text-gray-400 hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-300 active:text-gray-200"
              onClick={() => setModalOpen(false)}
            >
              <span className="sr-only">Close</span>
              <XIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <p className="mt-8">content</p>
        </div>
      </Modal>
    </>
  );
};

export const Primary = Template.bind({});
Primary.args = {};
