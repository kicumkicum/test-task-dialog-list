import transport from '../../lib/transport';

const STORE_KEY = 'REQUESTS';


const Actions = {
  HAS_ERRORED: 'HAS_ERRORED',
  IS_LOADING: 'IS_LOADING',
  FETCH_DATA_SUCCESS: 'FETCH_DATA_SUCCESS'
};


const initialState = {};


const createActionType = (actionPrefix, baseType) => `${actionPrefix}_${baseType}`;


const ActionCreators = {
  errorState: ({ hasError, actionPrefix }) => {
    return {
      type: createActionType(actionPrefix, Actions.HAS_ERRORED),
      payload: { hasError },
    };
  },

  loadingState: ({ isLoading, actionPrefix }) => {
    return {
      type: createActionType(actionPrefix, Actions.IS_LOADING),
      payload: { isLoading },
    };
  },

  fetchedSuccess: ({ data, actionPrefix }) => {
    return {
      type: createActionType(actionPrefix, Actions.FETCH_DATA_SUCCESS),
      payload: data,
    };
  },
};


const reducer = (state) => (state || initialState);


const request = ({ url, params = {}, actionPrefix, dispatch }) => {
  dispatch(loadingState({ isLoading: true, actionPrefix }));

  return transport.request({ url, params })
    .then((response) => {
      dispatch(loadingState({ isLoading: false, actionPrefix }));

      return response;
    })
    .catch((error) => {
      dispatch(errorState({ hasError: true, actionPrefix}));

      throw error;
    });
};


const {
  fetchedSuccess,
  errorState,
  loadingState,
} = ActionCreators;

export {
  Actions,
  STORE_KEY,
  reducer,

  fetchedSuccess,
  errorState,
  loadingState,

  request,
}
