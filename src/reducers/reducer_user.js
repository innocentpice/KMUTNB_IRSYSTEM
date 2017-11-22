import {
    USER_GETALL
}
from '../actions/type';

export default function(state = {}, action) {
    switch (action.type) {
        case USER_GETALL:
            return action.payload;
        default:
            return state;
    }
}
