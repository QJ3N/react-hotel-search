import React from 'react';
import { Router } from 'react-router';

import HotelsPage from './hotels';

export default (
	<Router>
		<Router component={ HotelsPage } path={ HotelsPage.path }/>
	</Router>
);