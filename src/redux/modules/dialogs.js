import { handleActions } from 'redux-actions';

import {
  Actions as RequestActions,
  fetchedSuccess,
  request,
} from './request';


const STORE_KEY = 'DIALOGS';


const Actions = {
  DIALOGS_HAS_ERRORED: `${STORE_KEY}_${RequestActions.HAS_ERRORED}`,
  DIALOGS_IS_LOADING: `${STORE_KEY}_${RequestActions.IS_LOADING}`,
  DIALOGS_FETCH_DATA_SUCCESS: `${STORE_KEY}_${RequestActions.FETCH_DATA_SUCCESS}`,
};


const initialState = {
  dialogs: [],
};


const Selectors = {
  dialogs: (state) => state[STORE_KEY].dialogs,
};


const reducer = handleActions({
  [Actions.DIALOGS_HAS_ERRORED]: (state, { payload: { hasError } }) => ({
    ...state,
    hasError,
  }),

  [Actions.DIALOGS_IS_LOADING]: (state, { payload: { isLoading } }) => ({
    ...state,
    isLoading,
  }),

  [Actions.DIALOGS_FETCH_DATA_SUCCESS]: (state, { payload: { dialogs } }) => ({
    ...state,
    dialogs,
  }),
}, initialState);


const actionPrefix = STORE_KEY;


const ActionCreators = {
  fetchDialogs: ({ from, to }) => (dispatch) => {
    const url = '/dialogs';
    const params = { from, to };

    return request({ url, params, actionPrefix, dispatch })
      .then((response) => {
        dispatch(fetchedSuccess({ data: { dialogs: response.data }, actionPrefix }));
      })
      .catch((error) => {
        throw error;
      });
  }
};


const {
  fetchDialogs,
} = ActionCreators;

const {
  dialogs: selectDialogs,
} = Selectors;

export {
  STORE_KEY,
  reducer,

  fetchDialogs,
  selectDialogs,
}
