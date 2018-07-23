import messages from '../stubs/messages';
import nemMessages from '../stubs/new-messages';
import users from '../stubs/users';
import { randomInteger } from './utils';

const dialogs = users.slice(0, 5).map((user, i) => {
  messages[i].sendDate = new Date(messages[i].sendDate);
  messages[i].isRead = Math.random() < 0.8;

  return {
    id: `dialog-${i}`,
    user,
    messages: [messages[i]],
    nonReadMessagesCount: !messages[i].isRead ? randomInteger(1, 10) : 0,
  };
});

const markAsRead = ({ message }) => {
  dialogs.forEach((dialog) => {
    const result = dialog.messages.some((_message) => {
      if (_message.id === message.id) {
        _message.isRead = true;
        return true;
      }
    });

    if (result) {
      dialog.nonReadMessagesCount = 0;
    }
  });
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
      markAsRead({ message });
      data = { success: true };
  }

  return send({ url, data });
};


export default stubTransportRequest;
