import { AnyAction } from "redux";
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

const notesReducer = (state = DEFAULT_STATE, action: AnyAction) => {
  switch (action.type) {
    case ADD_NOTE:
      return {
        ...state,
        note: {
          note: action.payload.note,
          checked: action.payload.checked,
        },
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
