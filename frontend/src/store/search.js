import { createBusiness } from "./business";
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
    console.log(Object.values(data))
    Object.values(data).forEach((business) => {
        const newBusiness = {
          business_yelp_id: business.id,
          coordinates: business.coordinates,
          location: {
            address1: business.location.address1,
            address2: business.location.address2, 
            address3: business.location.address3,
            city: business.location.city,
            zipCode: business.location.zipCode,
            country: business.location.country,
            state: business.location.state
          },
          name: business.name,
          yelp_rating: business.rating,
          is_closed: business.isClosed,
          image_url: business.imageUrl
        }
        dispatch(createBusiness(newBusiness))
    })
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