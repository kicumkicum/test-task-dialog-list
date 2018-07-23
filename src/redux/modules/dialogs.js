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
  DIALOG_MARK_AS_READ: 'DIALOG_MARK_AS_READ',
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
    dialogs: state.dialogs.concat(dialogs)
      // .sort((a, b) => a.sendDate - b.sendDate)
      // .filter((item, i, array) => item.id !== (array[i + 1] || {}).id),
  }),

  [Actions.DIALOG_MARK_AS_READ]: (state, { payload: { message } }) => ({
    ...state,
    dialogs: state.dialogs.map((dialog) => {
      let isChanged = false;
      return {
        ...dialog,
        messages: dialog.messages.map((_message) => {
          if (_message.id === message.id) {
            isChanged = true;
            return {
              ..._message,
              isRead: true,
            }
          }
          return _message;
        }),
        nonReadMessagesCount: isChanged ?  0 : dialog.nonReadMessagesCount,
      };
    }),
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
  },
  markAsRead: ({ message }) => {
    return (dispatch) => {
      const url = '/dialogs/read';
      const params = {
        id: message.id,
      };
      return request({ url, params, actionPrefix, dispatch })
        .then((response) => {
          if (response.success) {
            dispatch({
              type: Actions.DIALOG_MARK_AS_READ,
              payload: { message },
            });
          }
        })
        .catch((error) => {
          throw error;
        });
    }
  }
};


const {
  fetchDialogs,
  markAsRead,
} = ActionCreators;

const {
  dialogs: selectDialogs,
} = Selectors;

export {
  STORE_KEY,
  reducer,

  fetchDialogs,
  markAsRead,
  selectDialogs,
}
