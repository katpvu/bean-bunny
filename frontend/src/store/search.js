import { createBusiness } from "./business";
import csrfFetch from "./csrf";

// SELECTORS
export const getSearches = state => Object.values(state.searches)



// CONSTANTS
const RECEIVE_SEARCHES = 'searches/RECEIVE_SEARCHES'
const RECEIVE_RECS = 'searches/RECEIVE_RECS'
const CLEAR_SEARCHES = 'searches/CLEAR_SEARCHES'

// ACTION CREATORS
export const receiveSearches = (searches) => ({
    type: RECEIVE_SEARCHES,
    searches
})

export const receiveRecs = (recs) => ({
    type: RECEIVE_RECS,
    recs
})

export const clearSearches = () => ({
    type: CLEAR_SEARCHES
})

// THUNK ACTION CREATORS

export const fetchSearches = (location) => async dispatch => {
    const res = await csrfFetch('/api/searches', {
        method: "POST",
        body: JSON.stringify(location)
    });
    const data = await res.json();
    return dispatch(receiveSearches(data));
}

export const fetchRecs = (businessYelpId) => async dispatch => {
    const res = await csrfFetch(`/api/searches/recs/${businessYelpId}`)
    const data = await res.json();
    return dispatch(receiveRecs(data))
}



// REDUCER
const SearchesReducer = (state={}, action) => {
    switch (action.type) {
        case RECEIVE_RECS:
            return action.recs;
        case RECEIVE_SEARCHES:
            return action.searches;
        case CLEAR_SEARCHES:
            return {}
        default:
            return state;
    }
};
export default SearchesReducer;