/* eslint-disable sort-keys */
import { Bit, BitStatus, Language } from '~/types';

export const mockBit: Bit = {
  id: '5918463588561635990',
  creator: '5GMyG7j1GFzRBU15FC9KUc8q64hbtbCQ5Kdjee2aDip9DWTG',
  funding: '0000000000000000000000000000000000000001',
  repository: {
    url: 'a',
    branch: 'j',
    commit: 'j',
    readme: '# Readme',
    organization: 'garrettmaring',
    name: 'slampt-3',
    fullName: 'garrettmaring/slampt-3',
  },
  language: Language.C_SHARP,
  name: 'a',
  tests: [],
  requirements: {
    isEditable: 'a',
    isAddable: 'a',
    isDeletable: 'a',
  },
  solution: null,
  attemptCount: 0,
  createdOn: {
    number: 50675,
    dateTime: '2022-08-26T16:19:24Z',
  },
  updatedOn: {
    number: 50675,
    dateTime: '2022-08-26T16:19:24Z',
  },
  status: BitStatus.OPEN,
  solutionUserCount: 0,
};
