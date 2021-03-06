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
import MyCalendar from "./components/calendar/Calendar";
import JournalEntry from "./components/journal/JournalEntry";
import RevisedJournal from "./components/journal/RevisedJournal";
import Board from "./components/board/Board";
import Notes from "./components/notes/Notes";
import Feelings from "./components/feelings/Feelings";

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
            <Route exact path="/board" component={Board} />
            <Route exact path="/notes" component={Notes} />
            <Route exact path="/new-entry" component={JournalEntry} />
            <Route exact path="/journal" component={RevisedJournal} />
            <Route exact path="/calendar" component={MyCalendar} />
            <Route exact path="/feelings" component={Feelings} />
          </Switch>
        </App>
      </Fragment>
    </Router>
  </Provider>,
  document.getElementById("root")
);
