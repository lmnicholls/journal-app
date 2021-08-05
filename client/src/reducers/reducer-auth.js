import { AUTH_USER, AUTH_ERROR } from "../actions/types";

const INITIAL_STATE = {
  authenticated: localStorage.getItem("token"),
  errorMessage: "",
  email: null,
};
const AuthReducer = function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case AUTH_USER:
      return {
        ...state,
        authenticated: action.payload.token,
        email: action.payload.email || null,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
      };
    case AUTH_ERROR:
      return { ...state, errorMessage: action.payload };
    default:
      return state;
  }
};

export default AuthReducer;
