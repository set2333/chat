export const ACTIONS = {
  SET_SOCKET: 'SET_SOCKET',
  SET_NAME: 'SET_NAME',
  SET_NAME_SERVER: 'SET_NAME_SERVER',
  ADD_MESSAGE: 'ADD_MESSAGE',
  SEND_MESSAGE: 'SEND_MESSAGE',
};

export function setNameServer(name) {
  return ({ type: ACTIONS.SET_NAME_SERVER, name });
}

export function sendMessage(message) {
  return ({ type: ACTIONS.SEND_MESSAGE, message });
}
