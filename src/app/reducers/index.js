import { ACTIONS } from '../actions';

const initialState = {
  id: 0,
  name: 'User',
  messages: [],
  socket: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.SET_NAME: {
      return { ...state, name: action.name, id: action.id };
    }
    case ACTIONS.ADD_MESSAGE: {
      return { ...state, messages: [...state.messages, action.message] };
    }
    case ACTIONS.SET_SOCKET: {
      return { ...state, socket: action.socket };
    }
    default: {
      return { ...state };
    }
  }
};
