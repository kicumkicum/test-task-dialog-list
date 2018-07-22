import React from 'react';
import PropTypes from 'prop-types';

import Dialog from './dialog/dialog';
import VirtualScroll from '../virtual-scroll/virtual-scroll';

import styles from './dialogs-list.css';

const ITEM_HEIGHT = 65;

const renderDialog = (user, i) => {
  return (
    // TODO: Use real data
    <Dialog
      key={user}
      userName={user}
      lastMessage={`Message ${user}`}
      lastMessageDate={new Date()}
      nonReadMessagesCount={128}
      onClick={console.log}
    />
  );
};

const DialogsList = (props) => {
  const { users, viewItemsCount, bufferSize } = props;


  if (!users || !users.length) {
    return (<div>Dialogs is empty</div>);
  }

  return (
    <ul className={`${styles.dialogsList}`}>
      <VirtualScroll
        itemHeight={ITEM_HEIGHT}
        viewItemsCount={viewItemsCount}
        bufferSize={bufferSize}
      >
        {users.map(renderDialog)}
      </VirtualScroll>
    </ul>
  );
};

DialogsList.propTypes = {
  viewItemsCount: PropTypes.number.isRequired,
  bufferSize: PropTypes.number.isRequired,
};

export default DialogsList;
