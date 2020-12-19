import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import RegisterPage from './components/RegisterPage';

import reportWebVitals from './reportWebVitals';
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom';
import { compose, createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import userReducer from './store/reducers/userReducer';
import gameReducer from './store/reducers/gameReducer';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { PersistGate } from 'redux-persist/integration/react';
import hardSet from 'redux-persist/lib/stateReconciler/hardSet';
import thunk from 'redux-thunk';
import Footer from './components/Footer';
import requireAuth from './components/requireAuth';
import Dashboard from './components/Dashboard';
import AppNavBar from './components/AppNavBar';
import 'bootstrap/dist/css/bootstrap.css'

const persistConfig = {
  key: 'root',
  storage,
  stateReconciler: hardSet
}

const rootReducer = combineReducers({
  userR: userReducer,
  gameR: gameReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(persistedReducer, composeEnhancers(applyMiddleware(thunk)));
const persistor = persistStore(store);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <HashRouter>
          <AppNavBar/>
            <Switch>
              <Route exact path="/index" component={App} />
              <Route exact path="/register" component={RegisterPage} />
              <Route exact path="/dashboard" component={requireAuth(Dashboard)} />
              <Redirect exact from='/' to='/index' />
            </Switch>
            <Footer/>
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
