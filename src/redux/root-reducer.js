import { combineReducers } from 'redux';

import * as users from './modules/users';

const reducers = {
  [users.STORE_KEY]: users.reducer,
};

export default combineReducers(reducers);
