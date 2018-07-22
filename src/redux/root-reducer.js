import { combineReducers } from 'redux';

import * as dialogs from './modules/dialogs';
import * as request from './modules/request';
import * as users from './modules/users';

const reducers = {
  [dialogs.STORE_KEY]: dialogs.reducer,
  [request.STORE_KEY]: request.reducer,
  [users.STORE_KEY]: users.reducer,
};

export default combineReducers(reducers);
