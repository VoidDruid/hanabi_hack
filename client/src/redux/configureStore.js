import {
    createStore,
    combineReducers,
    compose,
    applyMiddleware,
} from 'redux';
import logger from 'redux-logger'
import ReduxThunk from 'redux-thunk'
import { statsReducer } from './reducer';
// if you're using redux-thunk or other middlewares, add them here
const createStoreWithMiddleware = compose(applyMiddleware(
    ReduxThunk,logger
)
)(createStore);
const rootReducer = combineReducers({
    stats:statsReducer,
});
export default function configureStore(initialState = {}) {
    return createStoreWithMiddleware(rootReducer, initialState);
};