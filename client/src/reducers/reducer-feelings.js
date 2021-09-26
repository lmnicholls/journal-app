import { ADD_FEELING, FETCH_FEELINGS } from "../actions/types";

const DEFAULT_STATE = {
  feeling: {},
  feelings: [],
};

const feelingsReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case ADD_FEELING:
      return {
        feeling: {
          text: action.payload.feeling,
          date: action.payload.date,
        },
        ...state,
      };
    case FETCH_FEELINGS:
      return {
        feeling: { ...state.feeling },
        feelings: action.payload.feelings,
      };
    default:
      return state;
  }
};

export default feelingsReducer;
