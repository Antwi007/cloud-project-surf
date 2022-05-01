import { PUT_SURF_KEYWORD, PUT_SURF_DATA, PUT_SURF_SEARCH_PARAMS } from "../actions/types";

const INTIAL_STATE = {
    keyword: "",
    surfData: [],
    surfSearchParams: {
        dragging: false,
        tap: false,
        hoverCard: null,
        center: [40.5842, -73.99967],
        status: 0,
        searchType: {
            "value": "small",
            "label": "Surf Breaks"
        },
        searchOption: "Surf Breaks",
    }
};

const surfSearchReducer = (state = INTIAL_STATE, action) => {
    switch (action.type) {
        case PUT_SURF_KEYWORD:
            return { ...state, keyword: action.payload };
        case PUT_SURF_DATA:
            return { ...state, surfData: action.payload };
        case PUT_SURF_SEARCH_PARAMS:
            return { 
                ...state, 
                surfSearchParams: {
                    ...state.surfSearchParams,
                    [action.payload[0]]: action.payload[1]
                }}
        default:
            return state;
    }
};
export default surfSearchReducer;
