import _messages from '../stubs/messages';
import nemMessages from '../stubs/new-messages';
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

const stubTransportIncoming = {
  newMessageFromTen: () => newMessage({ from: 0, to: 9 }),
  newMessageFromOther: () => newMessage({ from: 0, to: dialogs.length - 1 }),
  // TODO: implement
  newMessageFromNewUser: () => (dispatch) => {
    dispatch({
      // user,
      // dialogId,
      // message,
    });
  },
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
