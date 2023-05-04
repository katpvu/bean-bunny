
import {fetchBusiness} from './business';
import csrfFetch from "./csrf";
// CONSTANTS
export const RECEIVE_USER_DETAIL = 'users/RECEIVE_USER_DETAIL';

// ACTION CREATOR
export const receiveUserDetail = (payload) => ({
    type: RECEIVE_USER_DETAIL,
    payload
});

// THUNK ACTION CREATOR
export const fetchUserBusinessesRated = (userId) => async dispatch => {
    const res = await csrfFetch(`/api/users/${userId}`);
    const data = await res.json();
    console.log(data)
    const businessesRated = Object.values(data.businessesRated)
    // console.log(businessYelpIds)
    businessesRated.forEach(business => {
        dispatch(fetchBusiness(business.businessYelpId))
    })
};

// REDUCER 
const UsersReducer = (state={}, action) => {
    let newState = { ...state };
    switch (action.type) {
        case RECEIVE_USER_DETAIL:
            return action.payload.user
        default:
            return state
    }
};

export default UsersReducer;