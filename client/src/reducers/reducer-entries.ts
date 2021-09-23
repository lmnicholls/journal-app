import { AnyAction } from "redux";
import { ADD_ENTRY, FETCH_ENTRIES } from "../actions/types";

const DEFAULT_STATE = {
  entry: {},
  entries: [],
  numEntries: 0,
};

const journalEntriesReducer = (state = DEFAULT_STATE, action: AnyAction) => {
  switch (action.type) {
    case ADD_ENTRY:
      return {
        ...state,
        entry: {
          title: action.payload.title,
          date: action.payload.date,
          entry: action.payload.entry,
        },
      };
    case FETCH_ENTRIES:
      return {
        entry: { ...state.entry },
        entries: action.payload.entries,
        numEntries: action.payload.entries.length,
      };
    default:
      return state;
  }
};

export default journalEntriesReducer;
