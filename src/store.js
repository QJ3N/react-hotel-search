import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import { browserHistory } from 'react-router';
import thunk from 'redux-thunk';

import rootReducer from  './reducers';
import { DevTools } from './utils/index';

function _getMiddleware() {
	const middleware = [
        thunk,
        routerMiddleware(browserHistory)
	];

	return applyMiddleware(...middleware);
}

export default function configureStore(initialState) {
	const store = compose(
    _getMiddleware(),
		DevTools.instrument()
	)(createStore)(rootReducer, initialState);

	return store;
}
