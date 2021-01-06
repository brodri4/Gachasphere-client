import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { HashRouter, Switch, Route, Redirect } from "react-router-dom";
import { compose, createStore, applyMiddleware, combineReducers } from "redux";
import { Provider } from "react-redux";
import userReducer from "./store/reducers/userReducer";
import gameReducer from "./store/reducers/gameReducer";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { PersistGate } from "redux-persist/integration/react";
import hardSet from "redux-persist/lib/stateReconciler/hardSet";
import thunk from "redux-thunk";
import "bootstrap/dist/css/bootstrap.css";

// Components
import Footer from "./components/Footer";
import requireAuth from "./components/requireAuth";
import AppNavBar from "./components/AppNavBar";
import RegisterPage from "./components/RegisterPage";
import DetailedList_Playing from "./components/DetailedList_Playing";
import DetailedList_NotPlaying from "./components/DetailedList_NotPlaying";
import DetailedList_F2P from "./components/DetailedList_F2P";
import DetailedList_Gameplay from "./components/DetailedList_Gameplay";

// Pages
import HomePage from "./pages/HomePage";
import Games from "./pages/Games";
import Profile from "./pages/Profile";
import MyLists from "./pages/MyLists";
import PasswordReset from "./components/PasswordReset";
import ResetPage from "./components/ResetPage";
import Game from "./pages/Game";
import EditRating from "./components/EditRating";
import About from "./pages/About";
import ListGames from "./pages/ListGames";

const persistConfig = {
  key: "root",
  storage,
  stateReconciler: hardSet,
};

const rootReducer = combineReducers({
  userR: userReducer,
  gameR: gameReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  persistedReducer,
  composeEnhancers(applyMiddleware(thunk))
);
const persistor = persistStore(store);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <HashRouter>
          <AppNavBar />
          <Switch>
            {/* login, register, password reset, root redirect */}
            <Route exact path="/index" component={App} />
            <Route exact path="/register" component={RegisterPage} />
            <Route exact path="/recover" component={PasswordReset} />
            <Route path="/reset/:token" component={ResetPage} />
            <Redirect exact from="/" to="/index" />

            {/* Pages */}
            <Route exact path="/game/:gameId" component={requireAuth(Game)} />
            <Route exact path="/homepage" component={requireAuth(HomePage)} />
            <Route exact path="/games/all" component={requireAuth(Games)} />
            <Route path="/my-lists" component={requireAuth(MyLists)} />
            <Route path="/profile" component={requireAuth(Profile)} />
            <Route path="/list/:listId" component={requireAuth(ListGames)} />

            {/* Detailed List Views */}
            <Route
              exact
              path="/detailed/playing"
              component={requireAuth(DetailedList_Playing)}
            />
            <Route
              exact
              path="/detailed/not-playing"
              component={requireAuth(DetailedList_NotPlaying)}
            />
            <Route
              exact
              path="/detailed/free-to-play"
              component={requireAuth(DetailedList_F2P)}
            />
            <Route
              exact
              path="/detailed/gameplay"
              component={requireAuth(DetailedList_Gameplay)}
            />

            {/* Edit a rating */}
            <Route
              path="/edit-rating/:id"
              component={requireAuth(EditRating)}
            />

            {/* About page */}
            <Route exact path="/about" component={About} />
          </Switch>
          <Footer />
        </HashRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
