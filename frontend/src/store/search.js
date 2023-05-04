import csrfFetch from "./csrf";

// SELECTORS
export const getSearches = state => (
    state.searches ? Object.values(state.searches) : []
)


// CONSTANTS
export const RECEIVE_SEARCHES = 'searches/RECEIVE_SEARCHES'

// ACTION CREATORS
export const receiveSearches = (searches) => ({
    type: RECEIVE_SEARCHES,
    searches
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


// REDUCER
const SearchesReducer = (state={}, action) => {
    switch (action.type) {
        case RECEIVE_SEARCHES:
            return action.searches;
        default:
            return state;
    }
};
export default SearchesReducer;