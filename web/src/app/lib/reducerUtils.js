

import { combineReducers } from 'redux';
import globalReducers from './reducers'



export default function createReducer(asyncReducers) {

  return combineReducers({
  	...globalReducers,
    ...asyncReducers
  });
}
