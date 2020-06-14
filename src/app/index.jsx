import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddlware from 'redux-saga';
import reducer from './reducers';
import rootSaga from './sagas';
import Main from './components/main';

const sagaMiddleware = createSagaMiddlware();
const storeComponents = [reducer];
storeComponents.push(applyMiddleware(sagaMiddleware));

const store = createStore(...storeComponents);
sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <Provider store={store}>
    <Main />
  </Provider>,
  document.getElementById('app'));
