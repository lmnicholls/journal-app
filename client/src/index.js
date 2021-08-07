import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { render } from "react-dom";
import "./index.css";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers/index";
import App from "./components/App";
import StartPage from "./components/StartPage";
import Signup from "./components/auth/Signup";
import Signin from "./components/auth/Signin";
import Home from "./components/Home";
import MyCalendar from "./components/Calendar";
import JournalEntry from "./components/JournalEntry";
import Journal1 from "./components/Journal1";
import Stats from "./components/Stats";

const store = createStore(rootReducer, {}, applyMiddleware(thunk));

render(
  <Provider store={store}>
    <Router>
      <Fragment>
        <App>
          <Switch>
            <Route exact path="/">
              <StartPage />
            </Route>
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/signin" component={Signin} />
            <Route exact path="/home" component={Home} />
            <Route exact path="/new-entry" component={JournalEntry} />
            <Route exact path="/journal" component={Journal1}></Route>
            <Route exact path="/calendar" component={MyCalendar} />
            <Route exact path="/stats" component={Stats} />
          </Switch>
        </App>
      </Fragment>
    </Router>
  </Provider>,
  document.getElementById("root")
);
