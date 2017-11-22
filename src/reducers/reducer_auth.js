import {
    AUTH_SIGNUP,
    AUTH_LOGIN,
    AUTH_LOGOUT,
    AUTH_CHECK
}
from '../actions/type';

export default function(state = {}, action) {
    switch (action.type) {
        case AUTH_SIGNUP:
            return action.payload;
        case AUTH_LOGIN:
            return action.payload;
        case AUTH_LOGOUT:
            return action.payload;
        case AUTH_CHECK:
            return action.payload;
        default:
            return state;
    }
}
