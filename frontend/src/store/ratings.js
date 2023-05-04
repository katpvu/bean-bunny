import csrfFetch from "./csrf";
import { RECEIVE_BUSINESS } from "./business";

// SELECTORS
export const getBusinessRatings = state => (
    state.ratings ? Object.values(state.ratings) : []
);

// CONSTANTS
export const RECEIVE_RATING = 'ratings/RECEIVE_RATING';
export const REMOVE_RATING = 'ratings/REMOVE_RATING';

// ACTION CREATORS
export const receiveRating = (rating) => ({
    type: RECEIVE_RATING,
    rating
});

export const removeRating = (ratingId) => ({
    type: REMOVE_RATING,
    ratingId
});

// THUNK ACTION CREATORS
export const createRating = (rating) => async dispatch => {
    const res = await csrfFetch('/api/ratings', {
        method: 'POST',
        body: rating
    });
    const data = await res.json();
    console.log(data, "create rating data from backend")
    return dispatch(receiveRating(data));
};

export const updateRating = (rating) => async dispatch => {
    console.log(rating.get('id'))
    console.log(JSON.stringify(rating))
    const newRating = {
        rating: {
            id: rating.get('id'),
            rating: rating.get('rating[rating]'),
            notes: rating.get('rating[notes]'),
            fav_orders: rating.get('rating[fav_orders]'),
            user_id: rating.get('rating[user_id]')
        },
        business_yelp_id: rating.get('business_yelp_id')
    }
    const res = await csrfFetch(`/api/ratings/${newRating.rating.id}`, {
        method: 'PATCH',
        body: JSON.stringify(newRating)
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
        default:
            return state;
    };
};

export default RatingsReducer