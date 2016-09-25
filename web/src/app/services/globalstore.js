import { createStore,applyMiddleware } from 'redux';
import createReducer from 'lib/reducerUtils';
import thunkMiddleware from 'redux-thunk';

export  function configureStore(initialState) {
 	 const store = createStore(createReducer(),
 	 							initialState,
 	 							applyMiddleware(
						        thunkMiddleware
                       ), window.devToolsExtension ? window.devToolsExtension() : f => f
    );
 	 store.asyncReducers = {};
 	 return store;
}

export function injectAsyncReducers(store, name, asyncReducers) {
  	 store.asyncReducers= asyncReducers;
 	 store.replaceReducer(createReducer(store.asyncReducers));
}
