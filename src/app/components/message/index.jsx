import React from 'react';
import PropTypes from 'prop-types';
import TYPES_MESSAGE from '../../consts/typesMessage';
import styles from './styles.scss';

function getMessageClassName(typeMessage) {
  switch (typeMessage) {
    case TYPES_MESSAGE.INFO: {
      return styles.infoMessage;
    }
    case TYPES_MESSAGE.MESSAGE: {
      return styles.allMessage;
    }
    case TYPES_MESSAGE.HIS: {
      return styles.hisMessage;
    }
    default: {
      return styles.errMessage;
    }
  }
}

const Message = ({ text, type }) => (
  <div className={`${styles.message} ${getMessageClassName(type)}`}>
    <p>{text}</p>
  </div>
);

Message.propTypes = {
  text: PropTypes.string.isRequired,
  type: PropTypes.number.isRequired,
};

export default Message;
