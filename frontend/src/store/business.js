// CONSTANTS
export const GET_BUSINESS = 'businesses/GET_BUSINESS'

// ACTION CREATORS
export const getBusiness = (business) => ({
    type: GET_BUSINESS,
    business
});

// THUNK ACTION CREATORS

// REDUCER
const BusinessesReducer = (state={}, action) => {
    switch (action.type) {
        case GET_BUSINESS:
            return action.business
        default:
            return state;
    };
};

export default BusinessesReducer;