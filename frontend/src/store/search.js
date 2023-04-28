import csrfFetch from "./csrf";

// CONSTANTS
export const GET_SEARCHES = 'searches/GET_SEARCHES'

// ACTION CREATORS
export const getSearches = (searches) => ({
    type: GET_SEARCHES,
    searches
})

// THUNK ACTION CREATORS

export const fetchSearches = (location) => async dispatch => {
    const res = await csrfFetch('/api/searches', {
        method: "POST",
        body: JSON.stringify(location)
    });
    const data = await res.json();
    console.log(data)
    return dispatch(getSearches(data));
}


// REDUCER
const SearchesReducer = (state={}, action) => {
    switch (action.type) {
        case GET_SEARCHES:
            return action.searches;
        default:
            return state;
    }
};
export default SearchesReducer;