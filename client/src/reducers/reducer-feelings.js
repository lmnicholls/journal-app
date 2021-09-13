import { ADD_FEELING } from "../actions/types";

const DEFAULT_STATE = {
  feelings: [],
};

const feelingsReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case ADD_FEELING:
      return {
        feelings: [
          {
            feeling: action.payload.feeling,
            date: action.payload.date,
          },
          ...state,
        ],
      };
    default:
      return state;
  }
};

export default feelingsReducer;
