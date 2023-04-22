import csrfFetch from "./csrf";

// CONSTANTS
export const SET_CURRENT_USER = 'session/SET_CURRENT_USER'
export const REMOVE_CURRENT_USER = 'session/REMOVE_CURRENT_USER'

// ACTION CREATORS
export const setCurrentUser = (user) => ({
    type: SET_CURRENT_USER,
    user
});

export const removeCurrentUser = () => ({
    type: REMOVE_CURRENT_USER
})

// SELECTORS

// THUNK ACTION CREATORS
export const login = (user) => async dispatch => {
    let res = await csrfFetch('/api/session', {
        method: 'POST',
        body: JSON.stringify(user)
    });
    // console.log(res, "res in login method")
    let data = await res.json();
    dispatch(setCurrentUser(data.user));
    return res
};

export const logout = () => async dispatch => {
    let res = await csrfFetch('/api/session', {
        method: 'DELETE'
    });
    dispatch(removeCurrentUser());
    // return res
}

// REDUCER
const sessionReducer = (state={ user: null }, action) => {
    switch (action.type) {
        case SET_CURRENT_USER:
            return { ...state, user: action.user }
        case REMOVE_CURRENT_USER:
            return { ...state, user: null }
        default:
            return state;
    }
}
export default sessionReducer;