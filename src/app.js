import React, { PropTypes } from 'react';
import  { DevTools } from './utils/index';
import { Header } from './components/index';
export default class App extends React.Component { 

	static propTypes = {
		children: PropTypes.any.isRequired
	}

	static path = '/';

	render(){
		return(
			<div>
				{ this.props.children }
				{/* process.env.NODE_ENV !== 'production' ? <DevTools/> : null */}
			</div>
		);
	}

}
