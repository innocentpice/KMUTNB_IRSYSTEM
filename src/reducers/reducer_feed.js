import { 
    FEED_UPDATE, 
    FEED_DELETE,
    FEED_CHECK,
    FEED_EMPTY
} from '../actions/type';
import _ from 'lodash';

export default function(state = {}, action) {
    switch (action.type) {
        case FEED_EMPTY:
            return {...action.payload};
        case FEED_CHECK: 
            return {..._.omit(state, [_.difference(_.map(state,(value,key)=>{return key}),_.map(action.payload,(value,key)=>{return key}))])};
        case FEED_UPDATE:
            if(state[action.payload.key]){
                return {..._.assign(state,{[action.payload.key]:_.assign(state[action.payload.key], action.payload)})};
            }else{
                return {
                    [action.payload.key]:_.assign(state[action.payload.key], action.payload),
                    ...state
                };
            }
        case FEED_DELETE:
            return _.omit(state, [action.payload]);
        default:
            return state;
    }
}
