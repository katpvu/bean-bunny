import csrfFetch from "./csrf";
import { RECEIVE_USER_DETAIL } from "./users";

// SELECTOR
export const getBusiness = (businessId) => state => (
    state.businesses[businessId] ? state.businesses[businessId] : null
)

export const getBusinesses =  state => (
    state.businesses ? Object.values(state.businesses) : []
)

// CONSTANTS
export const RECEIVE_BUSINESS = 'businesses/RECEIVE_BUSINESS'
export const GET_DB_BUSINESS = 'businesses/GET_DB_BUSINESS'
export const CLEAR_BUSINESSES = 'businesses/CLEAR_BUSINESSES'
export const RECEIVE_USERS_BUSINESSES_RATED = 'business/RECEIVE_USERS_BUSINESSES_RATED'

// ACTION CREATORS
export const receiveBusiness = (payload) => ({
    type: RECEIVE_BUSINESS,
    payload
});

export const clearBusinesses = () => ({
    type: CLEAR_BUSINESSES
})

// THUNK ACTION CREATORS

export const fetchBusiness = (businessId) => async dispatch => {
    const res = await csrfFetch(`/api/businesses/${businessId}`);
    const data = await res.json();
    return dispatch(receiveBusiness(data));
}

export const createBusiness = (business) => async dispatch => {
    await csrfFetch('/api/businesses', {
        method: 'POST',
        body: JSON.stringify(business)
    });
};

const clearEmpty = (obj) => {
    delete obj.EMPTY
    return obj
}
// REDUCER
const BusinessesReducer = (state={}, action) => {
    let newState = { ...state }

    switch (action.type) {
        case RECEIVE_BUSINESS:
            return {[action.payload.business.businessYelpId]: action.payload.business}
        case RECEIVE_USER_DETAIL: 
            return {...action.payload.businessesRated}
        case CLEAR_BUSINESSES:
            return {};
        default:
            return state;
    };
};

export default BusinessesReducer;