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
      key={i}
      userName={`${id}: ${user.name}`}
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
    <ul
      className={`${styles.dialogsList}`}
      // style={props.style}
    >
      <VirtualScroll
        itemHeight={ITEM_HEIGHT}
        viewItemsCount={viewItemsCount}
        bufferSize={bufferSize}
        onScrollInDown={props.onScrollInDown}
      >
        {dialogs.map(renderDialog.bind(null, markAsRead))}
      </VirtualScroll>
    </ul>

    // Use it with with-slide
    // return (
    // <ul
    //   className={`${styles.dialogsList}`}
    //   style={props.style}
    // >
    //   {dialogs.map(renderDialog.bind(null, markAsRead))}
    // </ul>
  );
};

DialogsList.propTypes = {
  viewItemsCount: PropTypes.number.isRequired,
  bufferSize: PropTypes.number.isRequired,
  dialogs: PropTypes.array,
};

export default DialogsList;
