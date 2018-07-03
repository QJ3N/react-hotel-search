import React, { PropTypes }from 'react';
import classnames from 'classnames'
import './styles.css';
export default class Input extends React.Component { 

	static propTypes = {
		value: PropTypes.string.isRequired,
        placeholder: PropTypes.string,
        name: PropTypes.string,
		onChange: PropTypes.func.isRequired,
		divClasses: PropTypes.string,
		error: PropTypes.string
	}

	constructor(props) {
		super(props);

		const { value } = this.props;
		this.state = { value };

		this.handleChange = this.handleChange.bind(this)
	}

	handleChange(event) {
		const { value } =  event.target;
		this.props.onChange(event);
		this.setState({ value });
	}
	render(){

		const divClasses = classnames({
			'form-group': true,
            'input-length': true,
			'has-error': this.props.error ? true : false
		});
		const { value, placeholder, name } = this.props;
		return(
			<div className={ divClasses }>
				<input
					type='text'
					name={ name }
					value={ value }
					onChange={ this.handleChange }
                    placeholder={ placeholder }
					className='form-control'			
				/>
				{ this.props.error ? <span className="help-block">{ this.props.error }</span> : null }
			</div>
		);
	}

}
