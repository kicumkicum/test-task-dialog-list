import React from 'react';
import PropTypes from 'prop-types';

import styles from './dialog.css';

const dateFormatter = (date) => {
  return date.toDateString();
};

const Dialog = (props) => {
  const {
    lastMessage,
    lastMessageDate,
    nonReadMessagesCount,
    userName,
    onClick,
  } = props;

  return (
    <li
      className={`${styles.dialog}`}
      style={props.style}
      onClick={onClick}
    >
      <div>
        <div className={styles.head}>
          <div className={styles.name}>{userName}</div>
          <div className={styles.date}>{dateFormatter(lastMessageDate)}</div>
        </div>
        <div className={styles.content}>
          <div className={styles.message}>{lastMessage}</div>
          <div className={styles.count}>{nonReadMessagesCount}</div>
        </div>
      </div>
    </li>
  );
};

Dialog.propTypes = {
  lastMessage: PropTypes.string.isRequired,
  lastMessageDate: PropTypes.instanceOf(Date).isRequired,
  userName: PropTypes.string.isRequired,
  nonReadMessagesCount: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Dialog;
