import React from 'react';
import { Router, Route, IndexRoute } from 'react-router';

import App from './app';
import { HomePage, HomeRouter } from './pages/home/index';
import { HotelsRouter } from './pages/hotels/index';
import ErrorPage from './pages/error/index';

export default (
	<Router component={ App } path={ App.path }>
		<IndexRoute component={ HomePage }/>

		{ HomeRouter }
		{ HotelsRouter }

		<Route path='*' component={ ErrorPage }/>
	</Router>
);
