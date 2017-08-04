import _ from 'lodash';
import {FETCH_POSTS, FETCH_POST, DELETE_POST} from "../actions/index";

//by default state is an object
export default function (state = {}, action) {
    switch (action.type) {
        case FETCH_POST:
        //    const post = action.payload.data;
        //    const newState = { ...state };
        //    newState [post.id] = post;
        //    return newState;
        //It's the same as:
            return { ...state, [action.payload.data.id]: action.payload.data };
        case FETCH_POSTS:
            //Make groups with the results by ID
            return _.mapKeys(action.payload.data, 'id');
        case DELETE_POST:

            //lodash will help us!
            //look at the state, and please don't show the
            //deleted post please
            return _.omit(state, action.payload);
        default:
            return state;
    }
}

