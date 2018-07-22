import messages from '../stubs/messages';
import nemMessages from '../stubs/new-messages';
import users from '../stubs/users';
import { randomInteger } from './utils';

const dialogs = users.map((user, i) => {
  messages[i].sendDate = new Date(messages[i].sendDate);

  return {
    id: `dialog-${i}`,
    user,
    messages: [messages[i]],
    nonReadMessagesCount: randomInteger(0, 3),
  };
});

const send = (...args) => {
  return Promise.resolve(...args);
};

const stubTransportRequest = ({ url, params }) => {
  let data = null;

  switch (url) {
    case '/dialogs':
      const { from, to } = params;

      data = { data: dialogs.slice(from, from + to) };
      break;
  }

  return send(data);
};


export default stubTransportRequest;
