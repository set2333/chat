import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Topper from '../topper';
import ChatArea from '../chat-area';
import MessageString from '../message-string';
import {
  setNameServer as setNameServerAction,
  sendMessage as sendMessageAction,
 } from '../../actions';
import styles from './styles.scss';

const Main = ({
 name, setNameServer, sendMessage,
}) => (
  <div className={styles.content}>
    <Topper name={name} setNameServer={setNameServer} />
    <ChatArea />
    <MessageString sendMessage={sendMessage} />
  </div>
);

Main.propTypes = {
  name: PropTypes.string.isRequired,
  setNameServer: PropTypes.func.isRequired,
  sendMessage: PropTypes.func.isRequired,
};

export default connect(({ name }) => (
  { name }),
  {
    setNameServer: setNameServerAction,
    sendMessage: sendMessageAction,
   })(Main);
