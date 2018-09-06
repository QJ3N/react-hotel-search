import React, { PropTypes } from 'react';
import { bindAll } from 'lodash';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';

import { checkValidationFrom, setHotelsInfo } from './actions';
import Input from '../../components/ui/input/index';
//import CustomCellEditTable from '../../components/ui/myBootstrapTable/index';
import MyDayInputPiker  from '../../components/ui/myDayPickerInput/index';
import { config } from '../../api/amadeus/config';
import getMyFormatDateStr from './js/getNormalTime';

import './styles.css';

class HomePage extends React.Component { 

  static path = '/';

  static propTypes = {
	home: PropTypes.object.isRequired,
	dispatch: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props)
    this.state = {
      validationForm: {
        iata: {value: '', error: ''},
        checkInTime: {value: '', error: ''},
        checkOutTime: {value: '', error: ''},
        radiusOfArea: {value: '', error: ''},
        numberOfHotels: {value: '', error: ''},
        maxCost: {value: '', error: ''},
        currency: {value: '', error: ''},
        amenity: {value: '', error: ''},
        formIsValid: false
      }   
    };
  bindAll(this, ['handleSubmit','inputOnChange','handleInTimeChange','handleOutTimeChange']);

  }
  componentWillReceiveProps(nextProps) {

    if (typeof nextProps.home != 'undefined') {
      const { validationForm } = nextProps.home;
      this.setState({ validationForm });
      const { 
        city,
        iata,
        airport,
        checkInTime,
        checkOutTime,
        radiusOfArea,
        numberOfHotels,
        currency,
        maxCost,
        amenity  
      } = validationForm;
      if(validationForm.formIsValid === true){
        this.props.dispatch( 
          setHotelsInfo(
            config.api_key,
            iata.value,
            checkInTime.value,
            checkOutTime.value,
            numberOfHotels.value,
            radiusOfArea.value,
            currency.value,
            maxCost.value,
            amenity.value 
          ) 
        );
        this.props.dispatch(push('/hotels?page=1'));
      }
    }
  }
  inputOnChange(e) {
    const { name, value } = e.target
    let { validationForm } = this.state;
    switch(name) {
      case 'iata':       
        this.setState({
          validationForm: {
            ...validationForm,
            iata: { value, error:'' }
          }
        });
        break;
      case 'radiusOfArea':
        this.setState({
          validationForm: {
            ...validationForm,
            radiusOfArea: { value, error:'' }
          }
        });
        break;
      case 'numberOfHotels':
        this.setState({
          validationForm: {
            ...validationForm,
            numberOfHotels: { value, error:'' }
          }
        });
        break;
      case 'maxCost':
        this.setState({
          validationForm: {
            ...validationForm,
            maxCost: { value, error:'' }
          }
        });
        break;
      case 'currency':
        this.setState({
          validationForm: {
            ...validationForm,
            currency: { value, error:'' }
          }
        });   
        break;
      case 'amenity':
        this.setState({
          validationForm: {
            ...validationForm,
            amenity: { value, error:'' }
          }
        });
        break;
    }     
  }
  handleSubmit(e) {
    e.preventDefault();
  
    const { validationForm } = this.state;

    this.props.dispatch( checkValidationFrom(validationForm) );

  }
  handleInTimeChange(date) {
    const { validationForm } = this.state;

    this.setState({ 
      validationForm: {
        ...validationForm,
        checkInTime: { 
          value: getMyFormatDateStr(date),
           error:'' 
        }
      }
    });
  }
  handleOutTimeChange(date) {
    const { validationForm } = this.state;

    this.setState({ 
      validationForm: {
        ...validationForm,
        checkOutTime: {
          value: getMyFormatDateStr(date),
          error:'' 
        } 
      }
    });
  }
  render(){
    const {
      city,
      airport,
      iata,
      checkInTime,
      checkOutTime,
      radiusOfArea,
      numberOfHotels,
      currency,
      maxCost,
      amenity 
    } = this.state.validationForm;
    return(
        <div className='home-body'>
          <div id="welcomeimage" class="row">
            <img src='./img/hotel.jpg' className="img-fluid" alt="Responsive image"/>
            <div id="my_text_id" class="container">
                Search hotels for free
            </div>
          </div>
          <div className="container marging-valid-form">
            
            <form onSubmit={ this.handleSubmit } className="needs-validation" noValidate>
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th scope="col">Название</th>
                    <th scope="col">Значение</th>
                    <th scope="col">Описание</th>
                  </tr>
                </thead>
                <tbody>       
                  <tr>
                    <td>IATA code (обязательно)</td>
                    <td>
                      <Input
                        onChange={ this.inputOnChange }
                        name='iata'
                        value={ iata.value }
                        error={ iata.error }
                        placeholder='XXX'
                      />
                    </td>
                    <td>Кода аеропорта по стандарту IATA</td>
                  </tr>
                  <tr>
                    <td>Дата отправки (обязательно)</td>
                    <td>
                      <MyDayInputPiker 
                        onChange={this.handleInTimeChange}
                        error={checkInTime.error}
                      />

                    </td>
                    <td>Дата, когда гость начнет свое пребывание в отеле. Прошлая доступность не отображается,
                        доступность в будущем становится менее полезной примерно через 6 месяцев с текущей даты.</td>
                  </tr>
                  <tr>
                    <td>Дата прибытия (обязательно)</td>
                    <td>
                      <MyDayInputPiker 
                        onChange={this.handleOutTimeChange}
                        error={checkOutTime.error}
                      />                    
                    </td>
                    <td>Дата, на которую гость закончит свое пребывание в отеле.</td>
                  </tr>
                  <tr>
                    <td>Радиус от аеропорта(в км) </td>
                    <td>
                      <Input
                        onChange={ this.inputOnChange }
                        name='radiusOfArea'
                        value={ radiusOfArea.value }
                        error={ radiusOfArea.error }
                        placeholder='10'
                      />
                    </td>
                    <td>Радиус вокруг центра, чтобы искать отели в километрах (км).</td>
                  </tr>
                  <tr>
                    <td>Кол. отелей </td>
                    <td>
                      <Input
                        onChange={ this.inputOnChange }
                        name='numberOfHotels'
                        value={ numberOfHotels.value }
                        error={ numberOfHotels.error }
                        placeholder='10'
                      />
                    </td>
                    <td>Максимальное количество отелей для возврата в набор результатов. Отели заказаны по общей цене,
                        поэтому, если доступно больше, чем указанное максимальное количество отелей, возвращаются только самые дешевые варианты.</td>
                  </tr>
                  <tr>
                    <td>Выбо валюты </td>
                    <td>
                      <Input
                        onChange={ this.inputOnChange }
                        name='currency'
                        value={ currency.value }
                        error={ currency.error }
                        placeholder='USD'
                      />
                    </td>
                    <td>Валюта в которой будет выполнятся оплата (RUB, USD, ...)</td>
                  </tr>
                  <tr>
                    <td>Макс стоимость</td>
                    <td>
                      <Input
                        onChange={ this.inputOnChange }
                        name='maxCost'
                        value={ maxCost.value }
                        error={ maxCost.error }
                        placeholder='100'
                      />
                    </td>
                    <td>Максимальная цена котрую вы можете себе позволить, если не выбрана валюда то в USD</td>
                  </tr>
                  <tr>
                    <td>Удобства</td>
                    <td>
                      <Input
                        onChange={ this.inputOnChange }
                        name='amenity'
                        value={ amenity.value }
                        error={ amenity.error }
                        placeholder='POOL&PARKING'
                      />
                    </td>
                    <td>В отеле есть фильтр для поиска отелей с ограниченным доступом. Например:
                     amenity = POOL. (Примечание: в поиске можно использовать несколько удобств:
                     PARKING&RESTAURANT&PETS_ALLOWED). Возможные варианты можно посмотреть
                     <a href='https://sandbox.amadeus.com/hotels-api-supported-amenities-filter'> тут</a>.
                     </td>
                  </tr>
                </tbody>
            </table>
          <button type="submit" className="btn btn-primary" >Отправить</button>
          </form>
        </div>
      </div>
    );
  }

}
function mapStateToProps(state) {
 return {
	 home: state.home
 };
}

export default connect(mapStateToProps)(HomePage);
