import { createBusiness } from "./business";
import csrfFetch from "./csrf";

// SELECTORS
export const getSearches = state => Object.values(state.searches);

// CONSTANTS
const RECEIVE_SEARCHES = 'searches/RECEIVE_SEARCHES';
const RECEIVE_RECS = 'searches/RECEIVE_RECS';
const CLEAR_SEARCHES = 'searches/CLEAR_SEARCHES';
const RECEIVE_SEARCHES_ERRORS = 'searches/RECEIVE_SEARCHES_ERRORS';
const CLEAR_SEARCHES_ERRORS = 'searches/CLEAR_SEARCHES_ERRORS';

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

export const receiveErrors = (errors) => ({
    type: RECEIVE_SEARCHES_ERRORS,
    errors
})

export const clearSearchesErrors = (errors) => ({
    type: CLEAR_SEARCHES_ERRORS,
    errors
  });

// THUNK ACTION CREATORS
export const fetchSearches = (location) => async dispatch => {
    try {
        const res = await csrfFetch('/api/searches', {
            method: "POST",
            body: JSON.stringify(location)
        });
        const data = await res.json();
        return dispatch(receiveSearches(data));
    } catch (err) {
        const resBody = await err.json();
        dispatch(receiveErrors(resBody.errors));
    };
}

export const fetchRecs = (businessYelpId) => async dispatch => {
    const res = await csrfFetch(`/api/searches/recs/${businessYelpId}`)
    const data = await res.json();
    return dispatch(receiveRecs(data))
}

// REDUCERS
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

const nullErrors = null;
export const searchesErrorsReducer = (state = nullErrors, action) => {
    switch (action.type) {
      case RECEIVE_SEARCHES_ERRORS:
        return action.errors;
      case CLEAR_SEARCHES_ERRORS:
        return nullErrors;
      default:
        return state;
    }
  };
  
export default SearchesReducer;