import csrfFetch from "./csrf";
import { RECEIVE_BUSINESS } from "./business";
import { RECEIVE_USERS_BUSINESSES_RATED } from "./business";
import { RECEIVE_USER_DETAIL } from "./users";

// SELECTORS
export const getBusinessRatings = state => (
    state.ratings ? Object.values(state.ratings) : []
);


// CONSTANTS
export const RECEIVE_RATING = 'ratings/RECEIVE_RATING';
export const REMOVE_RATING = 'ratings/REMOVE_RATING';
export const CLEAR_RATINGS = 'ratings/CLEAR_RATINGS';

// ACTION CREATORS
export const receiveRating = (rating) => ({
    type: RECEIVE_RATING,
    rating
});

export const removeRating = (ratingId) => ({
    type: REMOVE_RATING,
    ratingId
});

export const clearRatings = () => ({
    type: CLEAR_RATINGS
})
// THUNK ACTION CREATORS
export const createRating = (rating) => async dispatch => {
    const res = await csrfFetch('/api/ratings', {
        method: 'POST',
        body: rating
    });
    const data = await res.json();
    return dispatch(receiveRating(data));
};

export const updateRating = (rating) => async dispatch => {
    const res = await csrfFetch(`/api/ratings/${rating.get('id')}`, {
        method: 'PATCH',
        body: rating
    });
    const data = await res.json();
    return dispatch(receiveRating(data));
};

export const deleteRating = (ratingId) => async dispatch => {
    await csrfFetch(`/api/ratings/${ratingId}`, {
        method: 'DELETE'
    });
    return dispatch(removeRating(ratingId));
};

// REDUCER
const RatingsReducer = (state={}, action) => {
    let newState = { ...state };
    switch (action.type) {
        case RECEIVE_RATING:
            newState = { ...newState, [action.rating.id]: action.rating}
            return newState
        case RECEIVE_BUSINESS: 
            return { ...action.payload.ratings }
        case REMOVE_RATING:
            delete newState[action.ratingId]
            return newState
        case RECEIVE_USER_DETAIL:
            return {...action.payload.ratings}
        case RECEIVE_USERS_BUSINESSES_RATED:
            return { ...newState, ...action.payload.ratings}
        case CLEAR_RATINGS:
            return {};
        default:
            return state;
    };
};

export default RatingsReducer