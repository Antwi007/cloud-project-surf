import { 
    GET_SURF_ACCOUNT_DETAILS, 
    PUT_SURF_ACCOUNT_DETAILS,
    PUT_PROFILE_PIC
} from "../actions/types";

const INTIAL_STATE = {
    title: null,
    mantra: null,
    nameShown: null,
    location: null,
    favorites: null,
    profilePic: null,
};

const surfProfileReducer = (state = INTIAL_STATE, action) => {
    switch (action.type) {
        case GET_SURF_ACCOUNT_DETAILS:
            return { ...state, ...action.payload };
        case PUT_SURF_ACCOUNT_DETAILS:
            return { ...state, ...action.payload };
        case PUT_PROFILE_PIC:
            return { ...state, profilePic: action.payload };
        default:
            return state;
    }
};
export default surfProfileReducer;