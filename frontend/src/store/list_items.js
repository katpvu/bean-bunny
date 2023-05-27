import csrfFetch from "./csrf"
import { RECEIVE_LIST_CONTENTS } from "./list";

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
export const CLEAR_LIST_ITEMS = 'listItems/CLEAR_LIST_ITEMS'

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
    type: REMOVE_LIST_ITEM,
    listItemId
});

export const clearListItems = () => ({
    type: CLEAR_LIST_ITEMS
})

// THUNK ACTION CREATORS
export const fetchListItems = () => async dispatch => {
    let res = await csrfFetch('/api/list_items');
    let data = await res.json();
    // console.log(data)
    return dispatch(receiveListItems(data));
};

export const fetchListItem = (listItemId) => async dispatch => {
    let res = await csrfFetch(`/api/list_items/${listItemId}`);
    let data = await res.json();
    return dispatch(receiveListItem(data));
};

export const createListItem = (listItem) => async dispatch => {
    let res = await csrfFetch('/api/list_items', {
        method: 'POST',
        body: JSON.stringify(listItem)
    });
    let data = await res.json();
    console.log(data, "errors should be here")
    return dispatch(receiveListItem(data));
};

export const deleteListItem = (listItemId) => async dispatch => {
    await csrfFetch(`/api/list_items/${listItemId}`, {
        method: 'DELETE'
    });
    dispatch(removeListItem(listItemId))
};

// REDUCER
const ListItemsReducer = (state={}, action) => {
    let newState = { ...state }
    switch (action.type) {
        case RECEIVE_LIST_CONTENTS:
            return { ...action.payload.listItems }
        case RECEIVE_LIST_ITEMS:
            return action.listItems
        case RECEIVE_LIST_ITEM:
            newState = { ...newState, [action.listItem.id]: action.listItem}
            return newState
        case REMOVE_LIST_ITEM:
            delete newState[action.listItemId]
            return newState;
        case CLEAR_LIST_ITEMS:
            return {}
        default:
            return state;
    };
};

export default ListItemsReducer;
