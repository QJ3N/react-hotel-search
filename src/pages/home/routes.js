import React from 'react';
import { Router } from 'react-router';
import HomePage from './home'

export default (
	<Router>
		<Router component={ HomePage } path={ HomePage.path }/>
	</Router>
);