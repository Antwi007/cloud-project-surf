import { SIGN_IN, SIGN_OUT, GET_ACCOUNT_DETAILS } from "../actions/types";

const INTIAL_STATE = {
  isSignedIn: null,
  userId: null,
  fullName: null,
  firstName: null,
  email: null,
};

const giveFirstandFullName = (fullStr) => {
  const words = fullStr.split(" ");

  for (let i = 0; i < words.length; i++) {
    words[i] = words[i][0].toUpperCase() + words[i].substr(1);
  }

  return [words[0], words.join(" ")];
}

const authReducer = (state = INTIAL_STATE, action) => {
  switch (action.type) {
    case SIGN_IN:
      return { ...state, isSignedIn: true, userId: action.payload };
    case SIGN_OUT:
      return {...INTIAL_STATE, isSignedIn: false};
    case GET_ACCOUNT_DETAILS:
      const firstAndFullName = giveFirstandFullName(action.payload.name)
      const firstName = firstAndFullName[0]
      const fullName = firstAndFullName[1]
      return { ...state, ...action.payload, firstName, fullName}
    default:
      return state;
  }
};
export default authReducer;
