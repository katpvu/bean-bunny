// CONSTANTS
export const GET_LIST = 'lists/GET_LIST'
export const GET_LISTS = 'lists/GET_LISTS'
export const REMOVE_LIST = 'lists/REMOVE_LIST'

// ACTION CREATORS
export const getList = (list) => ({
    type: GET_LIST,
    list
});

export const getLists = (lists) => ({
    type: GET_LISTS,
    lists
});

export const removeList = (listId) => ({
    type: REMOVE_LIST,
    listId
});

// THUNK ACTION CREATORS

// REDUCER
const ListsReducer = (state={}, action) => {
    switch (action.type) {
        case GET_LIST:
            
        case GET_LISTS:

        case REMOVE_LIST:
            
        default:
            return state;
    };
};

export default BusinessesReducer;