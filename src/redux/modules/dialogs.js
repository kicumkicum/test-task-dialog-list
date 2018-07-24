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
  DEBUG_NEW_MESSAGE_NEW_USER: 'DEBUG_NEW_MESSAGE_NEW_USER',
  DEBUG_NEW_MESSAGE_LAST_TEN: 'DEBUG_NEW_MESSAGE_LAST_TEN',
  DEBUG_NEW_MESSAGE_OTHER_USER: 'DEBUG_NEW_MESSAGE_OTHER_USER',
};


const initialState = {
  dialogs: [],
  dialogsByIds: {},
  messagesByDialogId: {},
};


const Selectors = {
  dialogs: (state) => state[STORE_KEY].dialogs,
  dialogsByIds: (state) => state[STORE_KEY].dialogsByIds,
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

  [Actions.DIALOGS_FETCH_DATA_SUCCESS]: (state, { payload: { dialogs } }) => {
    const newDialogsByIds = {};
    const messagesByDialogId = {};

    dialogs.forEach((dialog) => {
      newDialogsByIds[dialog.id] = dialog;
      messagesByDialogId[dialog.id] = dialog.messages;
    });

    return {
      ...state,
      dialogs: state.dialogs.concat(dialogs.map((dialog) => dialog.id)),
      dialogsByIds: {
        ...state.dialogsByIds,
        ...newDialogsByIds,
      },
      messagesByDialogId: {
        ...state.messagesByDialogId,
        ...messagesByDialogId,
      },
    };
  },

  [Actions.DIALOG_MARK_AS_READ]: (state, { payload: { dialog } }) => {
    return {
      ...state,
      messagesByDialogId: {
        ...state.messagesByDialogId,
        [dialog.id]: dialog.messages,
      },
      dialogsByIds: {
        ...state.dialogsByIds,
        [dialog.id]: dialog,
      }
    };
  },

  // TODO: имплементнуть поведение кнопок.
  // TODO: Баг: не всегда подгружаются данные при скролинге вниз
    [Actions.DEBUG_NEW_MESSAGE_LAST_TEN]: (state, { payload: { dialogId, message } }) => {
    const targetDialog = state.dialogsByIds[dialogId];
    const newMessages = [message].concat(targetDialog.messages);

    const dialogsByIds = {
      ...state.dialogsByIds,
      [dialogId]: {
        ...targetDialog,
        nonReadMessagesCount: targetDialog.nonReadMessagesCount + 1,
        messages: newMessages,
      },
    };

    const dialogs = [...state.dialogs];
    const dialogIndex = dialogs.indexOf(dialogId);
    dialogs.splice(dialogIndex, 1);
    dialogs.unshift(dialogId);

    return {
      ...state,
      dialogsByIds,
      dialogs,
      messagesByDialogId: {
        ...state.messagesByDialogId,
        [dialogId]: newMessages,
      }
    };
  },
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
            const { dialog } = response;
            dispatch({
              type: Actions.DIALOG_MARK_AS_READ,
              payload: { dialog },
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
  dialogsByIds: selectDialogsByIds,
} = Selectors;

export {
  STORE_KEY,
  reducer,

  fetchDialogs,
  markAsRead,
  selectDialogs,
  selectDialogsByIds,
}
