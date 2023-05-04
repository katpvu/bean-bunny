import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from 'redux-thunk'
import sessionReducer from './session.js'
import SearchesReducer from "./search.js";
import ListsReducer from "./list.js";
import ListItemsReducer from "./list_items.js";
import BusinessesReducer from "./business.js";
import RatingsReducer from "./ratings.js";
import UsersReducer from "./users.js";

// ROOT REDUCER
export const rootReducer = combineReducers({
    session: sessionReducer,
    searches: SearchesReducer,
    lists: ListsReducer,
    listItems: ListItemsReducer,
    businesses: BusinessesReducer,
    ratings: RatingsReducer,
    users: UsersReducer
})

// ENHANCER
let enhancer;

// in production, enhancer should only apply thunk middleware
if (process.env.NODE_ENV === 'production') {
    enhancer = applyMiddleware(thunk);
} else {
    // add logger middleware and Redux DevTools compose enhancer
    const logger = require('redux-logger').default;
    const composeEnhancers =
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

// CONFIGURE STORE 
const configureStore = (preloadedState) => {
    return createStore(rootReducer, preloadedState, enhancer);
};
export default configureStore;