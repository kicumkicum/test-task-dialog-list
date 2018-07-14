import Dialog from './dialog';


const renderDialog = (user) => {
  return (
    <Dialog
      userName
      lastMessage
      nonReadMessagesCount
      onClick
    />
  );
};


const DialogsList = (props) => {
  const { users } = props;
  return (
    users.map(renderDialog)
  );
};

export default DialogsList;
