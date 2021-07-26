import { ADD_ENTRY, FETCH_ENTRIES } from "../actions/types";
import { normalize, schema } from "normalizr";

const DEFAULT_STATE = {
  entries: [],
};

const journalEntriesSchema = new schema.Entity("entry", undefined);

const journalEntriesReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case ADD_ENTRY:
      return {
        entries: [...state, action.payload.data],
      };
    case FETCH_ENTRIES:
      const normalizedEntries = normalize(action.payload.results, [
        journalEntriesSchema,
      ]);

      return {
        entries: [...normalizedEntries],
      };
    default:
      return state;
  }
};

export default journalEntriesReducer;
