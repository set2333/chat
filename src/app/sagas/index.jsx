import {
  put, take, all, select, fork, call,
} from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';
import openSocket from 'socket.io-client';
import { ACTIONS } from '../actions';

function getWebSocketChannel(ws) {
  return eventChannel((emitter) => {
    ws.on('getName', (response) => {
      const { name, id } = JSON.parse(response);

      return emitter({ type: ACTIONS.SET_NAME, name, id });
    });

    ws.on('getMessage', (response) => {
      const message = JSON.parse(response);

      return emitter({ type: ACTIONS.ADD_MESSAGE, message });
    });

    return (() => {});
  });
}

function* watchSetName() {
  while (true) {
    const { name } = yield take(ACTIONS.SET_NAME_SERVER);
    const { socket, id } = yield select(({ socket: s, id: i }) => ({ socket: s, id: i }));
    socket.emit('setName', JSON.stringify({ name, id }));
  }
}

function* watchSendMessage() {
  while (true) {
    const { message } = yield take(ACTIONS.SEND_MESSAGE);
    const { socket, id } = yield select(({ socket: s, id: i }) => ({ socket: s, id: i }));
    socket.emit('sendMessage', JSON.stringify({ message, id }));
  }
}

function* watchServerData() {
  const ws = openSocket(process.env.API_PATH);
  yield put({ type: ACTIONS.SET_SOCKET, socket: ws });
  const channel = yield call(getWebSocketChannel, ws);

  while (true) {
    const action = yield take(channel);
    yield put(action);
  }
}

export default function* rootSaga() {
  yield all([
    fork(watchServerData),
    fork(watchSetName),
    fork(watchSendMessage),
  ]);
}
