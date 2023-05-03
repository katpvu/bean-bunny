import csrfFetch from "./csrf";

// SELECTOR
export const getBusiness = (businessId) => state => (
    state.businesses[businessId] ? state.businesses[businessId] : null
)

// CONSTANTS
export const RECEIVE_BUSINESS = 'businesses/RECEIVE_BUSINESS'
export const GET_DB_BUSINESS = 'businesses/GET_DB_BUSINESS'
// ACTION CREATORS
export const receiveBusiness = (payload) => ({
    type: RECEIVE_BUSINESS,
    payload
});

// THUNK ACTION CREATORS

export const fetchBusiness = (businessId) => async dispatch => {
    dispatch(createBusiness(businessId));
    const res = await csrfFetch(`/api/businesses/${businessId}`);
    const data = await res.json();
    console.log(data, "from fetchBusiness backend")
    return dispatch(receiveBusiness(data));
}

// everytime a business is fetched (user clicks on business, a new business is created)
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
            newState = { ...state, [action.payload.business.id]: action.payload.business}
            return newState
        default:
            return state;
    };
};

export default BusinessesReducer;