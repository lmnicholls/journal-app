import { combineReducers } from "redux";
import AuthReducer from "./reducer-auth";
import journalEntriesReducer from "./reducer-entries";

const rootReducer = combineReducers({
  auth: AuthReducer,
  journalEntries: journalEntriesReducer,
});

export default rootReducer;
