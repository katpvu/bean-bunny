

// SELECTORS
export const getList = (listId) => state => (
    state.lists[listId] ? state.lists[listId] : null
);

export const getLists = state => (
    state.posts ? Object.values(state.posts) : []
);

// CONSTANTS
export const RECEIVE_LIST = 'lists/RECEIVE_LIST'
export const RECEIVE_LISTS = 'lists/RECEIVE_LISTS'
export const REMOVE_LIST = 'lists/REMOVE_LIST'

// ACTION CREATORS
export const receiveList = (list) => ({
    type: RECEIVE_LIST,
    list
});

export const receiveLists = (lists) => ({
    type: RECEIVE_LISTS,
    lists
});

export const removeList = (listId) => ({
    type: REMOVE_LIST,
    listId
});

// THUNK ACTION CREATORS
export const fetchLists = () => async dispatch => {
    let res = await csrfFetch('/api/lists');
    let data = await res.json();
    dispatch(receiveLists)
};

export const fetchList = (listId) => async dispatch => {
    let res = await csrfFetch(`/api/lists/${listId}`);
    let data = await res.json();
    dispatch(receiveList(data))
};
export const createList = (list) => async dispatch => {
    let res = await csrfFetch('/api/lists', {
        method: 'POST',
        body: JSON.stringify(list)
    });
    let data = await res.json();
    return dispatch(receiveList(data));
};

export const updateList = (list) => async dispatch => {
    let res = await csrfFetch(`/api/lists/${list.id}`, {
        method: 'PATCH',
        body: JSON.stringify(list)
    });
    let data = await res.json();
    return dispatch(receiveList(data));
};

export const deleteList = (listId) => async dispatch => {
    let res = await csrfFetch(`/api/lists/${listId}`, {
        method: 'DELETE',
    });
    dispatch(removeList(listId));
};


// REDUCER
const ListsReducer = (state={}, action) => {
    let newState = { ...state };
    switch (action.type) {
        case RECEIVE_LIST:
            return newState[action.list.id] = action.list;
        case RECEIVE_LISTS:
            return { ...action.lists };
        case REMOVE_LIST:
            delete newState[action.postId];
        default:
            return state;
    };
};

export default ListsReducer;