
import {fetchBusiness} from './business';
import csrfFetch from "./csrf";
// CONSTANTS
export const RECEIVE_USER_DETAIL = 'users/RECEIVE_USER_DETAIL';
export const RECEIVE_USERS = 'users/RECEIVE_USERS'

// ACTION CREATOR
export const receiveUserDetail = (payload) => ({
    type: RECEIVE_USER_DETAIL,
    payload
});

export const receiveUsers = (payload) => ({
    type: RECEIVE_USERS,
    payload
})

// THUNK ACTION CREATOR

export const fetchUserDetail = (userId) => async dispatch => {
    const res = await csrfFetch(`/api/users/${userId}`);
    const data = await res.json();
    const businessesRated = Object.values(data.businessesRated)
    console.log(data)
    businessesRated.forEach(business => {
        dispatch(fetchBusiness(business.businessYelpId, userId))
    })
    dispatch(receiveUserDetail(data))
}

export const fetchUsers = () => async dispatch => {
    const res = await csrfFetch('/api/users');
    const data = await res.json();
    dispatch(receiveUsers(data));
}

// REDUCER 
const UsersReducer = (state={}, action) => {
    let newState = { ...state };
    switch (action.type) {
        case RECEIVE_USER_DETAIL:
            return action.payload.user
        case RECEIVE_USERS: 
            return {...action.payload }
        default:
            return state
    }
};

export default UsersReducer;