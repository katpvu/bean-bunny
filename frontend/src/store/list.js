
import csrfFetch from "./csrf";

// SELECTORS
export const getList = (listId) => state => (
    state.lists[listId] ? state.lists[listId] : null
);

export const getLists = state => (
    state.lists ? Object.values(state.lists).reverse() : []
);

// CONSTANTS
export const RECEIVE_LIST = 'lists/RECEIVE_LIST'
export const RECEIVE_LISTS = 'lists/RECEIVE_LISTS'
export const REMOVE_LIST = 'lists/REMOVE_LIST'
export const RECEIVE_LIST_CONTENTS = 'lists/RECEIVE_LIST_CONTENTS'

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

export const receiveListContents = payload => ({
    type: RECEIVE_LIST_CONTENTS,
    payload
})

// THUNK ACTION CREATORS
export const fetchLists = () => async dispatch => {
    let res = await csrfFetch('/api/lists');
    let data = await res.json();
    return dispatch(receiveLists(data));
};

export const fetchList = (listId) => async dispatch => {
    let res = await csrfFetch(`/api/lists/${listId}`);
    let data = await res.json();
    dispatch(receiveList(data))
};

export const fetchListContents = (listId) => async dispatch => {
    let res = await csrfFetch(`/api/lists/${listId}`)
    let data = await res.json();
    dispatch(receiveListContents(data))
}
export const createList = (list) => async dispatch => {
    let res = await csrfFetch('/api/lists', {
        method: 'POST',
        body: JSON.stringify(list)
    });
    let data = await res.json();
    return dispatch(receiveList(data.list));
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
    await csrfFetch(`/api/lists/${listId}`, {
        method: 'DELETE',
    });
    dispatch(removeList(listId));
};


// REDUCER
const ListsReducer = (state={}, action) => {
    let newState = { ...state };
    switch (action.type) {
        case RECEIVE_LIST:
            newState = { ...newState, [action.list.id]: action.list}
            return newState
        case RECEIVE_LISTS:
            return { ...action.lists };
        case REMOVE_LIST:
            delete newState[action.listId];
            return newState;
        case RECEIVE_LIST_CONTENTS:
            return { [action.payload.list.id]: action.payload.list }
        default:
            return state;
    };
};

export default ListsReducer;