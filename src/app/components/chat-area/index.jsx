import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Message from '../message';
import styles from './styles.scss';

const ChatArea = ({ messages }) => {
  const ref = useRef(null);
  useEffect(() => {
    ref.current.scrollTop = 9999;
  });

  return (
    <div ref={ref} className={styles.chatArea}>
      {messages.map(({ message, type }, index) => (
        <Message
          key={index}
          text={message}
          type={type}
        />
))}
    </div>
);
};

ChatArea.propTypes = {
  messages: PropTypes.arrayOf(PropTypes.shape({
    message: PropTypes.string,
    id: PropTypes.number,
    type: PropTypes.number,
  })).isRequired,
};

export default connect(({ messages }) => ({ messages }), {})(ChatArea);
