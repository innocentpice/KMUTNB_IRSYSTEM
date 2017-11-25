import {
    CHAT_SELECTROOM,
    CHAT_GETMESSAGES
}
from '../actions/type';

export default function(state = {}, action) {
    switch (action.type) {
        case CHAT_SELECTROOM :
            return {...state,roomkey:action.payload.RoomKey,matename:action.payload.mateEmail};
        case CHAT_GETMESSAGES :
            return {...state,messages:action.payload};
        default:
            return state;
    }
}
