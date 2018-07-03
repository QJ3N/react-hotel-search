import { CHECK_VALIDATION_FORM, SET_HOTEL_INFO } from './actions';
import { 
  iataIsValid,
  radiusIsValid,
  inTimeIsValid,
  outTimeIsValid,
  maxCostIsValid,
  numberOfHotelsIsValid,
  currencyIsValid
} from './js/validations';

const initialState = {
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
  },
  hotelsInfo: []
}



function homeReducer(state = initialState, action) {
	switch (action.type) {
    case CHECK_VALIDATION_FORM:

      let { 
        iata,
        formIsValid,
        radiusOfArea,
        checkInTime,
        checkOutTime,
        numberOfHotels,
        maxCost,
        currency
      } = action.validationForm;

      let dateInTimeMass = checkInTime.value.split('-');
      let dateOutTimeMass = checkOutTime.value.split('-');
      let currDate = new Date();
      let dateInTime = new Date(Number(dateInTimeMass[0]),Number(dateInTimeMass[1])-1,Number(dateInTimeMass[2]));
      let dateOutTime = new Date(Number(dateOutTimeMass[0]),Number(dateOutTimeMass[1])-1,Number(dateOutTimeMass[2]));   
      let result;

      formIsValid = true;

      //iata
      result = iataIsValid(
        iata,
        formIsValid
      );
      formIsValid = result.formIsValid;
      iata = result.iata;

      //radius
      result = radiusIsValid(
        radiusOfArea,
        formIsValid
      );
      formIsValid = result.formIsValid;
      radiusOfArea = result.radiusOfArea;

      //check in
      result = inTimeIsValid(
        checkInTime,
        formIsValid,
        currDate,
        dateInTime,
        dateInTimeMass
      );
      formIsValid = result.formIsValid;
      checkInTime = result.checkInTime;

      //check out
      result = outTimeIsValid(
        checkOutTime,
        formIsValid,
        dateOutTime,
        dateInTime,
        dateOutTimeMass
      );
      formIsValid = result.formIsValid;
      checkOutTime = result.checkOutTime;

      //number of hotels           
      result = numberOfHotelsIsValid(
        numberOfHotels,
        formIsValid
      );
      formIsValid = result.formIsValid;
      numberOfHotels = result.numberOfHotels;

      //max cost           
      result = maxCostIsValid(
        maxCost,
        formIsValid
      );
      formIsValid = result.formIsValid;
      maxCost = result.maxCost;

       result = currencyIsValid(
        action.status,
        currency,
        formIsValid
      );
      formIsValid = result.formIsValid;
      currency = result.currency;
      
      return Object.assign({}, state, { 
        validationForm: {
          ...action.validationForm,
          iata,
          formIsValid,
          radiusOfArea,
          checkInTime,
          checkOutTime,
          numberOfHotels,
          maxCost,
          currency
        }
      });

    case SET_HOTEL_INFO:       
      if(action.hotelsInfo.status) {
        alert(action.hotelsInfo.message);
        return state;
      }
      else return Object.assign({}, state, { hotelsInfo: action.hotelsInfo.results });
    default:
  	 return state;
	}
}


const HomeReducer = {
  home: homeReducer
};

export default HomeReducer;
