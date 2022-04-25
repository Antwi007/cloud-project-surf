import {
  SIGN_IN,
  SIGN_OUT,
  GET_ACCOUNT_DETAILS,
  PUT_SURF_ACCOUNT_DETAILS,
  PUT_PROFILE_PIC
} from "./types";

export const signIn = (userId) => {
  return {
    type: SIGN_IN,
    payload: userId,
  };
};

export const signOut = () => {
  return {
    type: SIGN_OUT,
  };
};

export const getAccountDetails = (userDetails) => { 
  return {
    type: GET_ACCOUNT_DETAILS,
    payload: userDetails
  }
}

export const putSurfAccountDetails = (userDetails) => { 
  return {
    type: PUT_SURF_ACCOUNT_DETAILS,
    payload: userDetails
  }
}

export const putProfilePic = (profilePic) => {
  return {
    type: PUT_PROFILE_PIC,
    payload: profilePic,
  }
}
