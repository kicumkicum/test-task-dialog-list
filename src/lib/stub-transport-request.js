import _messages from '../stubs/messages';
import users from '../stubs/users';
import { randomInteger } from './utils';


let messages = _messages.map((message) => {
  return {
    ...message,
    sendDate: new Date(message.sendDate),
  }
});

messages = messages.sort((a, b) => {
  return b.sendDate - a.sendDate;
});

let dialogs = users.map((user, i) => {
  const dialogId = `dialog-${i}`;
  messages[i].isRead = Math.random() < 0.8;
  messages[i].dialogId = dialogId;

  return {
    id: dialogId,
    user,
    messages: [messages[i]],
    nonReadMessagesCount: !messages[i].isRead ? randomInteger(1, 10) : 0,
  };
}).sort((a, b) => b.messages[0].sendDate - a.messages[0].sendDate);

const generateNewUser = () => {
  const lastUser = users[users.length - 1];
  const randomUser = users[randomInteger(0, users.length - 1)];
  return {
    id: lastUser.id + 1,
    name: 'new ' + randomUser.name,
  };
};

const generateNewDialog = ({ user }) => {
  return {
    id: `dialog-${user.id}`,
    messages: [],
    user,
    nonReadMessagesCount: 0,
  };
};

const generateNewMessage = ({ dialogId }) => {
  return {
    dialogId,
    id: messages.length,
    text: 'New Message ' + messages[randomInteger(0, messages.length - 1)].text,
    isRead: false,
    sendDate: new Date(),
  };
};

const markAsRead = ({ message }) => {
  let result = null;

  dialogs.forEach((dialog) => {
    if (dialog.id !== message.dialogId) {
      return;
    }

    dialog.messages.forEach((message) => message.isRead = true);
    dialog.nonReadMessagesCount = 0;

    result = dialog;
  });

  return { dialog: result };
};

const send = ({ url, data }) => {
  console.info('request', { url, data });
  return Promise.resolve(data);
};

const stubTransportRequest = ({ url, params }) => {
  let data = null;

  switch (url) {
    case '/dialogs':
      const { from, to } = params;

      data = { data: dialogs.slice(from, from + to) };
      break;
    case '/dialogs/read':
      const { id } = params;
      const message = messages.find((message) => message.id === id);
      const { dialog } = markAsRead({ message });
      data = { success: true, dialog };
      break;
    default:
      break;
  }

  return send({ url, data });
};

const newMessage = ({ from, to} ) => (dispatch) => {
  const dialogIndex = randomInteger(from, to);
  const dialog = dialogs[dialogIndex];
  const newMessage = {
    dialogId: dialog.id,
    sendDate: new Date(),
    text: 'new message: ' + dialog.messages[0].text,
    id: 1000 + dialog.messages[0].id,
    isRead: false
  };

  console.info('incoming new message', { newMessage, from: dialogIndex });

  dialog.messages = [newMessage].concat(dialog.messages);
  dialogs = dialogs.sort((a, b) => b.messages[0].sendDate - a.messages[0].sendDate)

  dispatch({
    type: 'DEBUG_NEW_MESSAGE_OLD_USER',
    payload: {
      dialog: dialog,
      message: newMessage,
    }
  });
};

const _newMessageFromNewUser = () => (dispatch) => {
  const newUser = generateNewUser();
  users.push(newUser);

  const newDialog = generateNewDialog({ user: newUser });

  const newMessage = generateNewMessage({ dialogId: newDialog.id });
  messages.unshift(newMessage);

  newDialog.messages = [newMessage];
  newDialog.nonReadMessagesCount = randomInteger(0, 5);

  console.info('incoming new message from new user', { newMessage, newUser, newDialog });

  dialogs.unshift(newDialog);

  dispatch({
    type: 'DEBUG_NEW_MESSAGE_NEW_USER',
    payload: {
      dialog: newDialog,
      message: newMessage,
    }
  });
};

const stubTransportIncoming = {
  newMessageFromTen: () => newMessage({ from: 0, to: 9 }),
  newMessageFromOther: () => newMessage({ from: 0, to: dialogs.length - 1 }),
  newMessageFromNewUser: _newMessageFromNewUser,
};

const {
  newMessageFromNewUser,
  newMessageFromOther,
  newMessageFromTen
} = stubTransportIncoming;

export {
  newMessageFromNewUser,
  newMessageFromOther,
  newMessageFromTen
};

export default stubTransportRequest;
