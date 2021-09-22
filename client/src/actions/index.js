import axios from "axios";
import {
  AUTH_USER,
  AUTH_ERROR,
  ADD_ENTRY,
  FETCH_ENTRY,
  FETCH_ENTRIES,
  ADD_FEELING,
  FETCH_FEELINGS,
  ADD_NOTE,
  FETCH_NOTES,
  DELETE_NOTE,
  EDIT_NOTE_CHECK,
  ADD_POSTIT,
  DELETE_POSTIT,
  FETCH_POSTITS,
  EDIT_POSTIT_POSITION,
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

export const addEntry = (title, date, entry) => (dispatch) => {
  const config = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  };

  axios
    .post("http://localhost:5000/entries", { title, date, entry }, config)
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

export const addFeeling = (feeling, date, callback) => (dispatch) => {
  const config = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  };

  axios
    .post("http://localhost:5000/feelings", { feeling, date, callback }, config)
    .then(function (response) {
      dispatch({ type: ADD_FEELING, payload: response.data });
      callback();
    })
    .catch(function (error) {
      console.log(error);
    });
};

export const fetchFeelings = () => (dispatch) => {
  const config = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  };

  axios
    .get("http://localhost:5000/feelings", config)
    .then(function (response) {
      dispatch({ type: FETCH_FEELINGS, payload: response.data });
    })
    .catch(function (error) {
      console.log(error);
    });
};

export const addNote = (note, checked) => (dispatch) => {
  const config = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  };

  axios
    .post("http://localhost:5000/notes", { note, checked }, config)
    .then(function (response) {
      dispatch({ type: ADD_NOTE, payload: response.data });
    })
    .catch(function (error) {
      console.log(error);
    });
};

export const fetchNotes = () => (dispatch) => {
  const config = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  };

  axios
    .get("http://localhost:5000/notes", config)
    .then(function (response) {
      dispatch({ type: FETCH_NOTES, payload: response.data });
    })
    .catch(function (error) {
      console.log(error);
    });
};

export const deleteNote = (noteID, callback) => (dispatch) => {
  const config = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  };

  axios
    .delete(`http://localhost:5000/notes/${noteID}`, config)
    .then(function (response) {
      dispatch({ type: DELETE_NOTE, payload: response.data });
      callback();
    })
    .catch(function (error) {
      console.log(error);
    });
};

export const editNoteCheck = (noteID, checkStatus, callback) => (dispatch) => {
  console.log(noteID, checkStatus);
  const config = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  };

  axios
    .put(
      `http://localhost:5000/notes/${noteID}`,
      { noteID, checkStatus },
      config
    )
    .then(function (response) {
      dispatch({ type: EDIT_NOTE_CHECK, payload: response.data });
      callback();
    })
    .catch(function (error) {
      console.log(error);
    });
};

export const fetchPostits = () => (dispatch) => {
  const config = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  };

  axios
    .get("http://localhost:5000/postits", config)
    .then(function (response) {
      dispatch({ type: FETCH_POSTITS, payload: response.data });
    })
    .catch(function (error) {
      console.log(error);
    });
};

export const addPostit = (postit, rotate, x, y, color) => (dispatch) => {
  const config = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  };

  axios
    .post(
      "http://localhost:5000/postits",
      { postit, rotate, x, y, color },
      config
    )
    .then(function (response) {
      dispatch({ type: ADD_POSTIT, payload: response.data });
    })
    .catch(function (error) {
      console.log(error);
    });
};

export const deletePostit = (postitID, callback) => (dispatch) => {
  const config = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  };

  axios
    .delete(`http://localhost:5000/postits/${postitID}`, config)
    .then(function (response) {
      dispatch({ type: DELETE_POSTIT, payload: response.data });
      callback();
    })
    .catch(function (error) {
      console.log(error);
    });
};

export const editPostitPosition = (postitID, x, y, callback) => (dispatch) => {
  const config = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  };

  axios
    .put(
      `http://localhost:5000/postits/${postitID}`,
      { postitID, x, y },
      config
    )
    .then(function (response) {
      dispatch({ type: EDIT_POSTIT_POSITION, payload: response.data });
      callback();
    })
    .catch(function (error) {
      console.log(error);
    });
};
