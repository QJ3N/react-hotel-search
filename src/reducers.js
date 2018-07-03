import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import { HomeReducer } from './pages/home/index';
import { HotelsReducer } from './pages/hotels/index';
export default combineReducers({
  routing: routerReducer,
  ...HomeReducer,
  ...HotelsReducer
});
