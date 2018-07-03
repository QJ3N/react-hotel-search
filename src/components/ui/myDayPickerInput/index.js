import React, { PropTypes }from 'react';
import classnames from 'classnames'
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import 'moment/locale/it';
import MomentLocaleUtils, {
  formatDate,
  parseDate,
} from 'react-day-picker/moment';
export default class MyDayInputPiker extends React.Component { 

	static propTypes = {
		onChange: PropTypes.func.isRequired,
		divClasses: PropTypes.string,
		error: PropTypes.string
	}
	render(){

		const divClasses = classnames({
			'form-group': true,
      'input-length': true,
			'has-error': this.props.error ? true : false
		});
		return(
			<div className={ divClasses }>
				<DayPickerInput
          formatDate={formatDate}
          parseDate={parseDate}
          format="L"
          placeholder={`${formatDate(new Date(), 'L', 'ru')}`}
          dayPickerProps={{
            locale: 'ru',
            localeUtils: MomentLocaleUtils,
            
          }}       
          inputProps={{
            className:'form-control ',
            readOnly:'readOnly'
          }}
          onDayChange={this.props.onChange}
        />
				{ this.props.error ? <span className="help-block">{ this.props.error }</span> : null }
			</div>
		);
	}

}
