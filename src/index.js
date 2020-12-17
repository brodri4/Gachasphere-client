import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Test from './test';
import RegisterPage from './components/RegisterPage';

import reportWebVitals from './reportWebVitals';
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom';
import { compose, createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import userReducer from './store/reducers/userReducer';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { PersistGate } from 'redux-persist/integration/react';
import hardSet from 'redux-persist/lib/stateReconciler/hardSet';
import thunk from 'redux-thunk';

const persistConfig = {
  key: 'root',
  storage,
  stateReconciler: hardSet
}

const rootReducer = combineReducers({
  userR: userReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(persistedReducer, composeEnhancers(applyMiddleware(thunk)));
const persistor = persistStore(store);

// index route leads to login page, assuming using app component for it
// <Route exact path="/register" component={Register} />
// <Route exact path="/dashboard" component={requireAuth(Dashboard)} />

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <HashRouter>
          <Switch>
            <Route exact path="/index" component={App} />
            <Route exact path="/register" component={RegisterPage} />
            <Redirect exact from='/' to='/index' />
          </Switch>
        </HashRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
