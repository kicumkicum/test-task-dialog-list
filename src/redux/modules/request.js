const Actions = {
  HAS_ERRORED: 'HAS_ERRORED',
  IS_LOADING: 'IS_LOADING',
  FETCH_DATA_SUCCESS: 'FETCH_DATA_SUCCESS'
};

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

const {
  fetchedSuccess,
  errorState,
  loadingState,
} = ActionCreators;

export {
  Actions,

  fetchedSuccess,
  errorState,
  loadingState,
}
