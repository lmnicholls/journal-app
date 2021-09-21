import { FETCH_POSTITS, ADD_POSTIT, DELETE_POSTIT } from "../actions/types";

const DEFAULT_STATE = {
  postit: {},
  postits: [],
};

const strategiesReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case FETCH_POSTITS: {
      return {
        postit: { ...state.postit },
        postits: action.payload.postits,
      };
    }
    case ADD_POSTIT: {
      return {
        postit: {
          postit: action.payload.postit,
          rotate: action.payload.rotate,
          x: action.payload.x,
          y: action.payload.y,
        },
        ...state,
      };
    }

    case DELETE_POSTIT: {
      return {
        postit: { ...state.postit },
        postits: action.payload.postits,
      };
    }
    default:
      return state;
  }
};

export default strategiesReducer;
