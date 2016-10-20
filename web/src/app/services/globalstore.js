import { createStore,applyMiddleware,compose } from 'redux';
import createReducer from 'lib/reducerUtils';
import thunkMiddleware from 'redux-thunk';

export  function configureStore(initialState) {
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    const store = createStore(createReducer(),
                                  initialState,
                                  composeEnhancers(applyMiddleware(thunkMiddleware))
    );
    store.asyncReducers = {};
    return store;
}

export function injectAsyncReducers(store, name, asyncReducers) {
    store.asyncReducers= asyncReducers;
    store.replaceReducer(createReducer(store.asyncReducers));
}
