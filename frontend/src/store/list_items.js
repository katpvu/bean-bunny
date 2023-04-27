import csrfFetch from "./csrf"

// SELECTORS
export const getListItems = state => (
    state.listItems ? Object.values(state.listItems).reverse() : []
);

export const getListItem = listItemId => state => (
    state.listItems[listItemId] ? state.listItems[listItemId] : null
);

// CONSTANTS
export const RECEIVE_LIST_ITEMS = 'listItems/RECEIVE_LIST_ITEMS'
export const RECEIVE_LIST_ITEM = 'listItems/RECEIVE_LIST_ITEM'
export const REMOVE_LIST_ITEM = 'listItems/REMOVE_LIST_ITEM'

// ACTION CREATORS
export const receiveListItem = (listItem) => ({
    type: RECEIVE_LIST_ITEM,
    listItem
});

export const receiveListItems = (listItems) => ({
    type: RECEIVE_LIST_ITEMS,
    listItems
});

export const removeListItem = (listItemId) => ({
    type: REMOVE_LIST_ITEM
});

// THUNK ACTION CREATORS
export const fetchListItems = () => async dispatch => {
    let res = await csrfFetch('/api/listItems');
    let data = await res.json();
    return dispatch(receiveListItems(data));
};

export const fetchListItem = (listItemId) => async dispatch => {
    let res = await csrfFetch(`/api/listItems/${listItemId}`);
    let data = await res.json();
    return dispatch(receiveListItem(data));
};

export const createListItem = (listItem) => async dispatch => {
    let res = await csrfFetch('/api/listItems', {
        method: 'POST',
        body: JSON.stringify(listItem)
    });
    let data = await res.json();
    return dispatch(receiveListItem(data));
};

export const deleteListItem = (listItemId) => async dispatch => {
    let res = await csrfFetch(`/api/listItems/${listItemId}`, {
        method: 'DELETE'
    });
    dispatch(removeListItem(listItemId))
};

// REDUCER

const ListItemsReducer = (state={}, action) => {
    switch (action.type) {
        default:
            return state;
    };
};

export default ListItemsReducer;
