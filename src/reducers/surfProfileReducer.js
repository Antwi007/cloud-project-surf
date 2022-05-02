import { 
    GET_SURF_ACCOUNT_DETAILS, 
    PUT_SURF_ACCOUNT_DETAILS,
    PUT_PROFILE_PIC,
    REMOVE_SURFING_ACCOUNT,
    SIGN_OUT,
} from "../actions/types";

const INTIAL_STATE = {
    title: null,
    mantra: null,
    nameShown: null,
    location: null,
    favorites: [],
    profilePic: null,
    email: null,
};

const surfProfileReducer = (state = INTIAL_STATE, action) => {
    switch (action.type) {
        case REMOVE_SURFING_ACCOUNT:
            return INTIAL_STATE;
        case GET_SURF_ACCOUNT_DETAILS:
            return { ...state, ...action.payload };
        case PUT_SURF_ACCOUNT_DETAILS:
            return { ...state, ...action.payload };
        case PUT_PROFILE_PIC:
            return { ...state, profilePic: action.payload };
        case SIGN_OUT:
            return INTIAL_STATE;
        default:
            return state;
    }
};
export default surfProfileReducer;