import { combineReducers } from "redux";

import authReducer from "./authReducer";
import surfProfileReducer from "./surfProfileReducer";
import surfSearchReducer from "./surfSearchReducer";

export default combineReducers({
  auth: authReducer,
  surfProfile: surfProfileReducer,
  surfSearch: surfSearchReducer,
});
