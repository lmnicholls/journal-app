import axios from "axios";
import {
  AUTH_USER,
  AUTH_ERROR,
  ADD_ENTRY,
  DELETE_ENTRY,
  EDIT_ENTRY,
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

export const signup =
  (formProps: any, callback: () => void) => (dispatch: any) => {
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

export const signin =
  (formProps: any, callback: () => void) => (dispatch: any) => {
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

export const fetchUser = () => (dispatch: any) => {
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

export const signout = (callback: () => void) => (dispatch: any) => {
  localStorage.removeItem("token");

  dispatch({ type: AUTH_USER, payload: "" });
  callback();
};

export const addEntry =
  (title: string, date: string, entry: string) => (dispatch: any) => {
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

export const deleteEntry =
  (entryID: string, callback: () => void) => (dispatch: any) => {
    const config = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };

    axios
      .delete(`http://localhost:5000/entries/${entryID}`, config)
      .then(function (response) {
        dispatch({ type: DELETE_ENTRY, payload: response.data });
        callback();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

export const editEntry =
  (entryID: string, title: string, entry: string, callback: () => void) =>
  (dispatch: any) => {
    const config = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };

    axios
      .put(
        `http://localhost:5000/entries/${entryID}`,
        { entryID, title, entry },
        config
      )
      .then(function (response) {
        dispatch({ type: EDIT_ENTRY, payload: response.data });
        callback();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

export const fetchEntries = () => (dispatch: any) => {
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

export const addFeeling =
  (feeling: string, date: string) => (dispatch: any) => {
    const config = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };

    axios
      .post("http://localhost:5000/feelings", { feeling, date }, config)
      .then(function (response) {
        dispatch({ type: ADD_FEELING, payload: response.data });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

export const fetchFeelings = () => (dispatch: any) => {
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

export const addNote = (note: string, checked: boolean) => (dispatch: any) => {
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

export const fetchNotes = () => (dispatch: any) => {
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

export const deleteNote =
  (noteID: string, callback: () => void) => (dispatch: any) => {
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

export const editNoteCheck =
  (noteID: string, checkStatus: boolean, callback: () => void) =>
  (dispatch: any) => {
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

export const fetchPostits = () => (dispatch: any) => {
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

export const addPostit =
  (postit: string, rotate: number, x: number, y: number, color: string) =>
  (dispatch: any) => {
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

export const deletePostit =
  (postitID: string, callback: () => void) => (dispatch: any) => {
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

export const editPostitPosition =
  (postitID: string, x: number, y: number, callback: () => void) =>
  (dispatch: any) => {
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
