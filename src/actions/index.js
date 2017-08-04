import axios from 'axios';

//I FETCH THE URLS FOR REQUESTS FROM http://reduxblog.herokuapp.com/api

const ROOT_URL = 'http://reduxblog.herokuapp.com/api';
const API_KEY =  '?key=PAPERCLIP7070';

export const FETCH_POSTS = 'fetch_posts';

export function fetchPosts() {
    const request = axios.get(`${ROOT_URL}/posts${API_KEY}`);

    return {
        type: FETCH_POSTS,
        payload: request
    };
}

/*
*
* with Firebase and Thunk:
*
* const Posts = new Firebase('https://fbredux.firebase.io/');
*
* export function fetchPosts() {
*   Posts.on('value', snapshot => {
*       dispatch({
*           type: FETCH_POSTS,
*           payload: snapshot.val()
*       });
*   });
* };
* }
*
* */

export const CREATE_POST = 'create_post';

export function createPost(values, callback) {

    //When the post is created, execute the callback which is declared
    //in the component (in this case posts_new)(in this case it's just a redirect)
    const request = axios.post(`${ROOT_URL}/posts${API_KEY}`, values)
        .then(() => callback());


    return {
        type: CREATE_POST,
        payload: request
        //payload: { [_.uniqueId()]: post } <= Maybe this is better?
    };
}


/*
* With thunk would be something like:
*
* export function createPost(post) {
*   return dispatch => Posts.push(post);
* }
* */

export const FETCH_POST = 'fetch_post';

export function fetchPost(id) {
    const request = axios.get(`${ROOT_URL}/posts/${id}${API_KEY}`);

    return {
        type: FETCH_POST,
        payload: request
    };
}

export const DELETE_POST = 'delete_post';

export function deletePost(id, callback) {
    const request = axios.delete(`${ROOT_URL}/posts/${id}${API_KEY}`)
        .then( () => callback() );

    return {
        type: DELETE_POST,
        //In this case, i will only return the id of the deleted post
        payload: id
    }

}