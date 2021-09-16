import {
  ADD_NOTE,
  FETCH_NOTES,
  DELETE_NOTE,
  EDIT_NOTE_CHECK,
} from "../actions/types";

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
    case DELETE_NOTE:
      return {
        note: { ...state.note },
        notes: action.payload.notes,
      };
    case EDIT_NOTE_CHECK:
      return {
        note: { ...state.note },
        notes: action.payload.notes,
      };
    default:
      return state;
  }
};

export default notesReducer;
