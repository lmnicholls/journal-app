import { ADD_ENTRY, FETCH_ENTRIES } from "../actions/types";
// import { normalize, schema } from "normalizr";

const DEFAULT_STATE = {
  entry: {},
  entries: [],
};

// const journalEntriesSchema = new schema.Entity("entry", undefined);

const journalEntriesReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case ADD_ENTRY:
      return {
        entry: {
          title: action.payload.title,
          date: action.payload.date,
          entry: action.payload.entry,
        },
        entries: [...state.entries],
      };
    case FETCH_ENTRIES:
      return {
        entry: { ...state.entry },
        entries: [action.payload.entries],
      };
    default:
      return state;
  }
};

export default journalEntriesReducer;
