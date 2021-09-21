import { combineReducers } from "redux";
import AuthReducer from "./reducer-auth";
import journalEntriesReducer from "./reducer-entries";
import feelingsReducer from "./reducer-feelings";
import notesReducer from "./reducer-notes";
import postitsReducer from "./reducer-postits";

const rootReducer = combineReducers({
  auth: AuthReducer,
  journalEntries: journalEntriesReducer,
  feelings: feelingsReducer,
  notes: notesReducer,
  postits: postitsReducer,
});

export default rootReducer;
