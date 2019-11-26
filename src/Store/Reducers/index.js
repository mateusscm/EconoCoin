import { combineReducers } from "redux";

import { user } from "./user";
import { info } from "./info";
import { cc } from "./c&c";

export const Reducers = combineReducers({
  user,
  info,
  cc
});
