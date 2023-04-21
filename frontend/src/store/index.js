import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from 'redux-thunk'

// ROOT REDUCER
export const rootReducer = combineReducers({

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