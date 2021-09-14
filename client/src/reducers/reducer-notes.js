import { ADD_NOTE, FETCH_NOTES } from "../actions/types";

const DEFAULT_STATE = {
  note: {},
  notes: [],
};

const notesReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case ADD_NOTE:
      return {
        note: {
          note: action.payload.note,
          checked: action.payload.checked,
        },
        ...state,
      };
    case FETCH_NOTES:
      return {
        note: { ...state.note },
        notes: action.payload.notes,
      };
    default:
      return state;
  }
};

export default notesReducer;
