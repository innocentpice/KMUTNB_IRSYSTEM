import {
    COURSE_GETALL
}
from '../actions/type';

export default function(state = {}, action) {
    switch (action.type) {
        case COURSE_GETALL:
            return action.payload;
        default:
            return state;
    }
}
