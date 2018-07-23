import React from 'react';
import PropTypes from 'prop-types';

import Dialog from './dialog/dialog';
import VirtualScroll from '../virtual-scroll/virtual-scroll';

import styles from './dialogs-list.css';

const ITEM_HEIGHT = 65;

const renderDialog = (markAsRead, dialog, i) => {
  const { id, user, messages, nonReadMessagesCount } = dialog;
  const lastMessage = messages[messages.length - 1];

  return (
    <Dialog
      key={id}
      userName={i + ' ' + user.name}
      lastMessage={lastMessage.text}
      lastMessageDate={lastMessage.sendDate}
      nonReadMessagesCount={nonReadMessagesCount}
      onClick={() => markAsRead({ message: lastMessage })}
    />
  );
};

const DialogsList = (props) => {
  const { dialogs, viewItemsCount, bufferSize, markAsRead } = props;

  if (!dialogs || !dialogs.length) {
    return (<div>Dialogs is empty</div>);
  }

  return (
    <ul className={`${styles.dialogsList}`}>
      <VirtualScroll
        itemHeight={ITEM_HEIGHT}
        viewItemsCount={viewItemsCount}
        bufferSize={bufferSize}
        onScrollInDown={props.onScrollInDown}
      >
        {dialogs.map(renderDialog.bind(null, markAsRead))}
      </VirtualScroll>
    </ul>
  );
};

DialogsList.propTypes = {
  viewItemsCount: PropTypes.number.isRequired,
  bufferSize: PropTypes.number.isRequired,
  dialogs: PropTypes.array,
  onItemClick: PropTypes.func.isRequired,
};

export default DialogsList;
