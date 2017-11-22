import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import promise from 'redux-promise';
import thunk from 'redux-thunk';

import rootReducer from '../reducers';

// const createStoreWithMiddleware = applyMiddleware(promise)(createStore);
// const store = createStoreWithMiddleware(rootReducer);

const store = createStore(rootReducer, composeWithDevTools(
    applyMiddleware(promise, thunk)
));

if (module.hot) {
    module.hot.accept('../reducers', () => {
        const nextRootReducer = require('../reducers');
        store.replaceReducer(nextRootReducer);
    });
}

export default store;
