import { handleActions } from 'redux-actions';

import {
  Actions as RequestActions,
  fetchDataSuccess,
  setErrorState,
  loadingState,
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

const ActionCreators = {
  fetchAllUsers: () => (dispatch) => {
    const url = '';
    const actionPrefix = STORE_KEY;

    dispatch(loadingState({ isLoading: true, actionPrefix }));

    return request(url)
      .then((response) => {
        dispatch(loadingState({ isLoading: false, actionPrefix }));

        const users = response.data;
        dispatch(fetchDataSuccess({ data: { users }, actionPrefix }));
      })
      .catch((error) => {
        dispatch(setErrorState({ hasError: true, actionPrefix}));

        throw error;
      });
  },
};

const {
  fetchAllUsers,
} = ActionCreators;

export {
  fetchAllUsers,
}
