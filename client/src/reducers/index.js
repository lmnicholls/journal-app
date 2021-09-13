import { combineReducers } from "redux";
import AuthReducer from "./reducer-auth";
import journalEntriesReducer from "./reducer-entries";
import feelingsReducer from "./reducer-feelings";

const rootReducer = combineReducers({
  auth: AuthReducer,
  journalEntries: journalEntriesReducer,
  feelings: feelingsReducer,
});

export default rootReducer;
