import axios from "axios";
import {
  AUTH_USER,
  AUTH_ERROR,
  ADD_ENTRY,
  FETCH_ENTRY,
  FETCH_JOURNAL_ENTRIES,
} from "./types";

export const signup = (formProps, callback) => (dispatch) => {
  axios
    .post("/signup")
    .then(function (response) {
      dispatch({ type: AUTH_USER, payload: response.data });
      localStorage.setItem("token", response.data.token);
      callback();
    })
    .catch(function (error) {
      dispatch({ type: AUTH_ERROR, payload: error });
    });
};

export const signin = (formProps, callback) => (dispatch) => {
  axios
    .post("/signin", formProps)
    .then(function (response) {
      debugger;
      dispatch({ type: AUTH_USER, payload: response.data });
      localStorage.setItem("token", response.data.token);
      callback();
    })
    .catch(function (error) {
      dispatch({ type: AUTH_ERROR, payload: error });
    });
};

export const fetchUser = () => (dispatch) => {
  const config = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  };

  axios
    .get(
      // added proxy
      "/current_user",
      config
    )
    .then(function (response) {
      dispatch({ type: AUTH_USER, payload: response.data });
      localStorage.setItem("token", response.data.token);
    })
    .catch(function (error) {
      console.log(error);
    });
};

export const signout = (callback) => (dispatch) => {
  localStorage.removeItem("token");

  dispatch({ type: AUTH_USER, payload: "" });
  callback();
};

export const addEntry = (entry) => (dispatch) => {
  console.log(entry);

  const config = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  };

  axios
    .post("/entries", { entry }, config)
    .then(function (response) {
      dispatch({ type: ADD_ENTRY, payload: response.data });
    })
    .catch(function (error) {
      console.log(error);
    });
};

export const fetchEntry = (id) => (dispatch) => {
  axios
    .get()
    .then(function (response) {
      dispatch({ type: FETCH_ENTRY, payload: response.data });
    })
    .catch(function (error) {
      console.log(error);
    });
};

export const fetchEntries = () => (dispatch) => {
  const config = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  };

  axios
    .get("/entries", config)
    .then(function (response) {
      dispatch({ type: FETCH_JOURNAL_ENTRIES, payload: response.data });
    })
    .catch(function (error) {
      console.log(error);
    });
};
