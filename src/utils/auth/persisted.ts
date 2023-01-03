import { User } from '~/utils/contexts/userContext';

import createPersistedState from 'use-persisted-state-v2';
import { USER_PERSISTED_STATE_KEY } from '~/utils/auth/constants';

// Propagate signed in user data (read, write, update) to persistent local store
export const usePersistedUserState = createPersistedState<User>(
  USER_PERSISTED_STATE_KEY
);
