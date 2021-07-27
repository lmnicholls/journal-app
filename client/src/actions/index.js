import axios from "axios";
import {
  AUTH_USER,
  AUTH_ERROR,
  ADD_ENTRY,
  FETCH_ENTRY,
  FETCH_ENTRIES,
} from "./types";

export const signup = (formProps, callback) => (dispatch) => {
  axios
    .post("http://localhost:5000/signup", formProps)
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
    .post("http://localhost:5000/signin", formProps)
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
    .get("http://localhost:5000/current_user", config)
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
    .post("http://localhost:5000/entries", { entry }, config)
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
    .get("http://localhost:5000/entries", config)
    .then(function (response) {
      dispatch({ type: FETCH_ENTRIES, payload: response.data });
    })
    .catch(function (error) {
      console.log(error);
    });
};
