import {
    LOGIN_USER,
    REGISTER_USER,
    UPDATE_USER,
} from "../constants/typeRedux";

const initialState = {
    login: {
        user: {
            username: "Thai Ly Tien",
            avatar: "",
            address: "Sa Huynh, Quang Ngai",
        },
    },
    register: {},
    comments: [],
};
export default function (state = initialState, action) {
    switch (action.type) {
        case REGISTER_USER:
            return { ...state, register: action.payload };
        case LOGIN_USER:
            return { ...state, login: action.payload.data };
        
        case UPDATE_USER:
            return {
                ...state,
                login: {
                    ...state.login,
                    user: action.payload.data.user,
                },
            };
        default:
            return state;
    }
}
