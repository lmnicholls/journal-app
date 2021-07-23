import axios from "axios";
import { AUTH_USER, AUTH_ERROR } from "./types";

export const fetchUser = () => (dispatch) => {
  const config = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  };

  axios
    .get(
      // added proxy
      "/auth/current_user",
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

export const signin = (formProps, callback) => (dispatch) => {
  axios
    .post("/auth/signin", formProps)
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
