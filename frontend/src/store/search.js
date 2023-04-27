import csrfFetch from "./csrf";

// SELECTOR
// export const getBusiness = (businessId) => state => (
//     state.searches[businessId] ? state.searches[businessId] : null
// )

// CONSTANTS
export const GET_SEARCHES = 'searches/GET_SEARCHES'
// export const GET_SEARCH = 'searches/GET_SEARCH'
// export const CLEAR_SEARCHES = 'searches/CLEAR_SEARCHES'

// ACTION CREATORS
export const getSearches = (searches) => ({
    type: GET_SEARCHES,
    searches
})

// export const getSearch = (business) => ({
//     type: GET_SEARCH,
//     business
// });

// export const clearSearches = () => ({
//     type: CLEAR_SEARCHES
// })


// THUNK ACTION CREATORS

export const fetchSearches = (location) => async dispatch => {
    const res = await csrfFetch('/api/searches', {
        method: "POST",
        body: JSON.stringify(location)
    });
    const data = await res.json();
    return dispatch(getSearches(data));
}

// export const fetchSearch = (businessId) => async dispatch => {
//     const res = await csrfFetch(`/api/searches/${businessId}`);
//     const data = await res.json();
//     return dispatch(getSearch(data));
// }


// REDUCER
const SearchesReducer = (state={}, action) => {
    switch (action.type) {
        case GET_SEARCHES:
            return action.searches;
        // case GET_SEARCH:
        //     let newState = { ...state }
        //     newState = { ...state, [action.business.id]: action.business}
        //     return newState
        // case CLEAR_SEARCHES:
        //     return state;
        default:
            return state;
    }
};
export default SearchesReducer;