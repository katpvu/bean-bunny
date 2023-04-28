import csrfFetch from "./csrf";

// SELECTOR
export const getBusiness = (businessId) => state => (
    state.businesses[businessId] ? state.businesses[businessId] : null
)

// CONSTANTS
export const RECEIVE_BUSINESS = 'businesses/RECEIVE_BUSINESS'

// ACTION CREATORS
export const receiveBusiness = (business) => ({
    type: RECEIVE_BUSINESS,
    business
});

// THUNK ACTION CREATORS

export const fetchBusiness = (businessId) => async dispatch => {
    const res = await csrfFetch(`/api/businesses/${businessId}`);
    const data = await res.json();
    dispatch(createBusiness(businessId));
    // console.log(data, "data after fetching from yelp in backend")
    return dispatch(receiveBusiness(data));
}

// need to make sure that when business is added to a list, it creates a business object so it could have reviews
export const createBusiness = (businessId) => async dispatch => {
    const newBusiness = { businessYelpId: businessId }
    await csrfFetch('/api/businesses', {
        method: 'POST',
        body: JSON.stringify(newBusiness)
    });
};

// REDUCER
const BusinessesReducer = (state={}, action) => {
    switch (action.type) {
        case RECEIVE_BUSINESS:
            let newState = { ...state }
            newState = { ...state, [action.business.id]: action.business}
            return newState
        default:
            return state;
    };
};

export default BusinessesReducer;