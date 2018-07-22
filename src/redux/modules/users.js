import { handleActions } from 'redux-actions';

import {
  Actions as RequestActions,
  fetchedSuccess,
  request,
} from './request';


const STORE_KEY = 'USERS';


const Actions = {
  USERS_HAS_ERRORED: `${STORE_KEY}_${RequestActions.HAS_ERRORED}`,
  USERS_IS_LOADING: `${STORE_KEY}_${RequestActions.IS_LOADING}`,
  USERS_FETCH_DATA_SUCCESS: `${STORE_KEY}_${RequestActions.FETCH_DATA_SUCCESS}`,
};


const initialState = {
  users: [],
};


const Selectors = {
  users: (state) => state[STORE_KEY].users,
};


const reducer = handleActions({
  [Actions.USERS_HAS_ERRORED]: (state, { payload: { hasError } }) => ({
    ...state,
    hasError,
  }),

  [Actions.USERS_IS_LOADING]: (state, { payload: { isLoading } }) => ({
    ...state,
    isLoading,
  }),

  [Actions.USERS_FETCH_DATA_SUCCESS]: (state, { payload: { users } }) => ({
    ...state,
    users,
  }),
}, initialState);


const actionPrefix = STORE_KEY;

const ActionCreators = {
  fetchAllUsers: () => (dispatch) => {
    const url = 'users';

    return request({ url, actionPrefix, dispatch })
      .then((response) => {

        const users = response.data;
        dispatch(fetchedSuccess({ data: { users }, actionPrefix }));
      })
      .catch((error) => {
        throw error;
      });
  },
};


const {
  fetchAllUsers,
} = ActionCreators;

const {
  users: selectUsers,
} = Selectors;

export {
  STORE_KEY,
  reducer,

  fetchAllUsers,
  selectUsers,
}
