import { combineReducers } from "redux";

import authReducer from "./authReducer";
import surfProfileReducer from "./surfProfileReducer";

export default combineReducers({
  auth: authReducer,
  surfProfile: surfProfileReducer,
});
