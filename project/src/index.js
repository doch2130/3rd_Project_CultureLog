import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'antd/dist/antd';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { applyMiddleware, createStore } from 'redux';
import promiseMiddleware from 'redux-promise';
import ReduxThunk from 'redux-thunk';
import Reducer from './reducers';
import { composeWithDevTools } from '@redux-devtools/extension';
import { CookiesProvider } from 'react-cookie';

const createStoreWithMiddleware = applyMiddleware(
  promiseMiddleware,
  ReduxThunk
)(createStore);
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <CookiesProvider>
    <BrowserRouter>
      <Provider
        store={createStoreWithMiddleware(Reducer, composeWithDevTools())}
      >
        <App />
      </Provider>
    </BrowserRouter>
  </CookiesProvider>
);

reportWebVitals();
