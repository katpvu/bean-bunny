import csrfFetch, { storeCSRFToken } from "./csrf";

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

// HELPER FUNCTIONS

const storeCurrentUser = (user) => {
    if (user) {
        sessionStorage.setItem("currentUser", JSON.stringify(user));
    } else {
        sessionStorage.removeItem("currentUser");
    };
};

// THUNK ACTION CREATORS
export const login = (user) => async dispatch => {
    let res = await csrfFetch('/api/session', {
        method: 'POST',
        body: JSON.stringify(user)
    });
    let data = await res.json();
    storeCurrentUser(data.user);
    dispatch(setCurrentUser(data.user));
    return res
};

export const logout = () => async dispatch => {
    let res = await csrfFetch('/api/session', {
        method: 'DELETE'
    });
    storeCurrentUser(null);
    dispatch(removeCurrentUser());
    return res
};

export const signup = (user) => async dispatch => {
    let res = await csrfFetch('/api/users', {
        method: 'POST',
        body: JSON.stringify(user)
    });
    let data = await res.json();
    storeCurrentUser(data.user);
    dispatch(setCurrentUser(data.user));
    return res;
};

export const restoreSession = () => async dispatch => {
    let res = await csrfFetch('/api/session');
    storeCSRFToken(res);
    const data = await res.json();
    storeCurrentUser(data.user);
    dispatch(setCurrentUser(data.user));
    return res
};

// REDUCER
const initialState = {
    user: JSON.parse(sessionStorage.getItem("currentUser"))
}
const sessionReducer = (state= initialState, action) => {
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