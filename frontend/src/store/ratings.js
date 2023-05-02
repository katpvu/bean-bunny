import csrfFetch from "./csrf";

// CONSTANTS
export const RECEIVE_RATING = 'ratings/RECEIVE_RATING';
export const RECEIVE_RATINGS = 'ratings/RECEIVE_RATINGS';
export const REMOVE_RATING = 'ratings/REMOVE_RATING';

// ACTION CREATORS
export const receiveRating = (rating) => ({
    type: RECEIVE_RATING,
    rating
});

export const receiveRatings = (ratings) => ({
    type: RECEIVE_RATINGS,
    ratings
});

export const removeRating = (ratingId) => ({
    type: REMOVE_RATING,
    ratingId
});

// THUNK ACTION CREATORS
export const fetchRating = (ratingId) => async dispatch => {
    const res = await csrfFetch(`/api/ratings/${ratingId}`);
    const data = await res.json();
    return dispatch(receiveRating(data));
};

export const fetchRatings = () => async dispatch => {
    const res = await csrfFetch('/api/ratings');
    const data = await res.json();
    return dispatch(receiveRatings(data));
};

export const createRating = (rating) => async dispatch => {
    const res = await csrfFetch('/api/ratings', {
        method: 'POST',
        body: JSON.stringify(rating)
    });
    const data = await res.json();
    return dispatch(receiveRating(data));
};

export const updateRating = (rating) => async dispatch => {
    const res = await csrfFetch(`/api/ratings/${rating.id}`, {
        method: 'PATCH',
        body: JSON.stringify(rating)
    });
    const data = await res.json();
    return dispatch(receiveRating(data));
};

export const deleteRating = (ratingId) => async dispatch => {
    await csrfFetch(`/api/lists/${ratingId}`, {
        method: 'DELETE'
    });
    return dispatch(removeRating(ratingId));
};

// REDUCER
const RatingsReducer = (state={}, action) => {
    let newState = { ...state };
    switch (action.type) {
        case RECEIVE_RATING:

        case RECEIVE_RATINGS:

        case REMOVE_RATING:

        default:
            return state;
    };
};

export default RatingsReducer