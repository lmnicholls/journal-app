import { AnyAction } from "redux";
import {
  FETCH_POSTITS,
  ADD_POSTIT,
  DELETE_POSTIT,
  EDIT_POSTIT_POSITION,
} from "../actions/types";

const DEFAULT_STATE = {
  postit: {},
  postits: [],
};

const postitReducer = (state = DEFAULT_STATE, action: AnyAction) => {
  switch (action.type) {
    case FETCH_POSTITS: {
      return {
        postit: { ...state.postit },
        postits: action.payload.postits,
      };
    }
    case ADD_POSTIT: {
      return {
        ...state,
        postit: {
          postit: action.payload.postit,
          rotate: action.payload.rotate,
          x: action.payload.x,
          y: action.payload.y,
        },
      };
    }
    case DELETE_POSTIT: {
      return {
        postit: { ...state.postit },
        postits: action.payload.postits,
      };
    }
    case EDIT_POSTIT_POSITION: {
      return {
        postit: { ...state.postit },
        postits: action.payload.postits,
      };
    }
    default:
      return state;
  }
};

export default postitReducer;
