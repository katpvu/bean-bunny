import csrfFetch from "./csrf";

// SELECTOR
export const getBusiness = (businessId) => state => (
    state.businesses[businessId] ? state.businesses[businessId] : null
)

// CONSTANTS
export const RECEIVE_BUSINESS = 'businesses/RECEIVE_BUSINESS'
export const GET_DB_BUSINESS = 'businesses/GET_DB_BUSINESS'
export const RECEIVE_USERS_BUSINESSES_RATED = 'business/RECEIVE_USERS_BUSINESSES_RATED'

// ACTION CREATORS
export const receiveBusiness = (payload) => ({
    type: RECEIVE_BUSINESS,
    payload
});

export const receiveUsersBusinessRated = (payload) => ({
    type: RECEIVE_USERS_BUSINESSES_RATED,
    payload
})
// THUNK ACTION CREATORS

// export const fetchBusiness = (businessId, type=0) => async dispatch => {
//     console.log(type)
//     // dispatch(createBusiness(businessId));
//     const res = await csrfFetch(`/api/businesses/yelp/${businessId}`);
//     const data = await res.json();
//     if (type) {
//         return dispatch(receiveUsersBusinessRated(data))
//     } else {
//         return dispatch(receiveBusiness(data));
//     }
// }

export const fetchBusiness = (businessId) => async dispatch => {
    const res = await csrfFetch(`/api/businesses/${businessId}`);
    const data = await res.json();
    console.log(data)
    return dispatch(receiveBusiness(data));
}

// everytime a business is fetched (user clicks on business, a new business is created)
export const createBusiness = (business) => async dispatch => {
    // const newBusiness = { businessYelpId: businessId }
    await csrfFetch('/api/businesses', {
        method: 'POST',
        body: JSON.stringify(business)
    });
};


// REDUCER
const BusinessesReducer = (state={}, action) => {
    let newState = { ...state }
    switch (action.type) {
        case RECEIVE_BUSINESS:
            newState = { ...state, [action.payload.business.id]: action.payload.business}
            return newState
        case RECEIVE_USERS_BUSINESSES_RATED:
            return { ...newState, [action.payload.business.id]: action.payload.business}
        default:
            return state;
    };
};

export default BusinessesReducer;