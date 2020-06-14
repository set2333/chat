import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { txtSendButton } from '../../consts/dictionary';
import styles from './styles.scss';

const MessageString = ({ sendMessage }) => {
  const [message, setMessage] = useState('');
  const ref = useRef(null);
  useEffect(() => {
    ref.current.focus();
  });

  const handleSendMessage = () => {
    sendMessage(message);
    setMessage('');
  };

  return (
    <div>
      <input
        ref={ref}
        className={`${styles.messageSring} ${!message ? styles.messageSringAllWidth : ''}`}
        type="text"
        value={message}
        onChange={({ target: { value } }) => setMessage(value)}
        onKeyDown={({ key }) => {
          if (key === 'Enter') handleSendMessage();
        }}
      />
      {message && (
      <input
        type="button"
        value={txtSendButton}
        onClick={handleSendMessage}
        className={styles.buttonSend}
      />
)}
    </div>
);
};

MessageString.propTypes = {
  sendMessage: PropTypes.func.isRequired,
};

export default MessageString;
